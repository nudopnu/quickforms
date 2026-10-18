import { Component, computed, effect, ElementRef, inject, input, output, signal, viewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormlyConfig, FormlyFieldConfig, FormlyForm } from "@ngx-formly/core";
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { collectFileRefs, FileStore } from './file-store';

/** "firstName" / "first_name" / "first-name" -> "First Name" */
function titleCase(key: string): string {
    return key
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Übernimmt aus dem alten Model nur Werte, deren Typ noch zum neuen Schema passt.
 * Sonst landet z. B. ein Objekt aus "cars: Car" in einem Feld "cars: Car[]" und das Array-Feld bricht.
 */
function prune(value: any, schema: any, root: any): any {
    if (typeof schema?.$ref === "string" && schema.$ref.startsWith("#/$defs/")) {
        schema = root.$defs?.[schema.$ref.slice("#/$defs/".length)];
    }
    if (value === undefined || value === null || !schema) return undefined;
    switch (schema.type) {
        case "object": {
            if (typeof value !== "object" || Array.isArray(value)) return undefined;
            const result: Record<string, any> = {};
            for (const [key, sub] of Object.entries(schema.properties ?? {})) {
                const v = prune(value[key], sub, root);
                if (v !== undefined) result[key] = v;
            }
            return result;
        }
        case "array":
            return Array.isArray(value)
                ? value.map((v) => prune(v, schema.items, root)).filter((v) => v !== undefined)
                : undefined;
        case "string":
            return typeof value === "string" ? value : undefined;
        case "number":
        case "integer":
            return typeof value === "number" ? value : undefined;
        case "boolean":
            return typeof value === "boolean" ? value : undefined;
        default:
            return value;
    }
}

/**
 * Formly übernimmt beim Auflösen eines $ref nur title/description/default/widget vom Property-Schema;
 * Constraints daneben (z. B. `@maxLength(500) notes: text` oder `accept` an `File`) gingen verloren.
 * `{ $ref, ...rest }` wird daher zu `{ allOf: [{ $ref }], ...rest }` – allOf führt Formly vollständig zusammen.
 */
function refsToAllOf(schema: any): any {
    if (Array.isArray(schema)) return schema.map(refsToAllOf);
    if (typeof schema !== "object" || schema === null) return schema;
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(schema)) result[key] = refsToAllOf(value);
    const { $ref, ...rest } = result;
    if (typeof $ref === "string" && Object.keys(rest).length) return { ...rest, allOf: [{ $ref }] };
    return result;
}

/** Felder vom TypeSpec-Model File (x-file) bzw. File[] werden zu einem einzelnen Upload-Feld. */
function toFileField(field: FormlyFieldConfig, schema: any): FormlyFieldConfig {
    const multiple = schema.type === "array" && !!schema.items?.["x-file"];
    if (!schema["x-file"] && !multiple) return field;
    const { fieldGroup, fieldArray, defaultValue, ...rest } = field;
    return { ...rest, type: "file", props: { ...rest.props, multiple, accept: schema.accept } };
}

@Component({
    selector: "mo-form",
    imports: [FormlyForm, ReactiveFormsModule],
    providers: [FileStore],
    host: { class: "block h-full" },
    template: `
      <form #formEl [formGroup]="state().form" (ngSubmit)="onSubmit()" class="flex h-full min-h-0 flex-col gap-4 p-4">
        <h1 class="text-2xl font-bold">{{ state().title }}</h1>
        <div class="divider m-0"></div>
        <!-- Nur ab hier scrollen; data-print-expand: der PDF-Export klappt den Bereich für den Screenshot auf -->
        <div data-print-expand class="-mx-4 min-h-0 flex-1 overflow-y-auto px-4">
            <formly-form [form]="state().form" [fields]="state().fields" [model]="state().model" (modelChange)="valueChange.emit($event)"></formly-form>
            <button type="submit" class="btn btn-primary btn-sm w-fit" [disabled]="exporting()">Submit</button>
        </div>
    </form>
    `,
})
export class Form {
    private store = inject(FileStore);
    private formlyConfig = inject(FormlyConfig);
    schema = input.required<any>();
    /** Aktuelle Formulardaten, bei jeder Eingabe und nach jedem Schema-Wechsel. */
    valueChange = output<unknown>();
    /** Letztes Model, damit Eingaben über Schema-Änderungen erhalten bleiben. */
    private lastModel: any = {};
    /** Bei jedem neuen Schema eine frische FormGroup, sonst bleiben alte Controls hängen. */
    state = computed(() => {
        const schema = this.schema();
        const model = prune(this.lastModel, schema, schema) ?? {};
        this.lastModel = model;
        const root = new FormlyJsonschema().toFieldConfig(refsToAllOf(schema), {
            map: (field, fieldSchema) => {
                // Ohne @summary (-> "title") den Property-Namen als Label verwenden.
                if (!field.props?.label && typeof field.key === "string") {
                    field.props = { ...field.props, label: titleCase(field.key) };
                }
                // x-widget (z. B. "textarea" am Scalar text) wählt einen registrierten Formly-Typ.
                const widget = fieldSchema["x-widget"];
                if (typeof widget === "string" && this.formlyConfig.types[widget]) field.type = widget;
                return toFileField(field, fieldSchema);
            },
        });
        // Titel kommt als <h1>: @summary am Model, sonst der Model-Name aus $id ("Foo.json").
        const title = root.props?.label ?? titleCase(String(schema.$id ?? "").replace(/\.json$/, ""));
        if (root.props) delete root.props.label;
        return { form: new FormGroup({}), fields: [root] as FormlyFieldConfig[], model, title };
    });

    constructor() {
        // Nach Schema-Wechsel einmal melden; setTimeout, damit Formly Defaults schon ins Model geschrieben hat.
        effect(() => {
            const { model } = this.state();
            setTimeout(() => this.valueChange.emit(model));
        });
    }

    formEl = viewChild.required<ElementRef<HTMLFormElement>>('formEl');
    exporting = signal(false);

    async onSubmit() {
        const { form, model } = this.state();
        if (form.invalid) {
            form.markAllAsTouched();
            return;
        }
        this.exporting.set(true);
        try {
            // Lazy, damit pdf-lib & Co. nicht im Initial-Bundle landen
            const { exportElementAsPdf } = await import('./pdf-export');
            const date = new Date().toISOString().slice(0, 10);
            await exportElementAsPdf(this.formEl().nativeElement, {
                fileName: `${this.schema().$id.replace(/\.json$/, '')}-${date}.pdf`,
                title: this.schema().$id,
                schemaId: this.schema().$id,
                data: model,
                // Nur Dateien, auf die das Model noch verweist
                attachments: collectFileRefs(model).flatMap((ref) => {
                    const file = this.store.get(ref.attachment);
                    return file ? [{ name: ref.attachment, file }] : [];
                }),
            });
        } finally {
            this.exporting.set(false);
        }
    }
}