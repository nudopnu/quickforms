import { Component, computed, effect, ElementRef, inject, input, model, output, signal, viewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormlyConfig, FormlyFieldConfig, FormlyForm } from "@ngx-formly/core";
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { collectFileRefs, FileStore } from './file-store';
import { TablerIconComponent } from "@tabler/icons-angular";

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

/**
 * TypeSpec gibt `A | B` als `anyOf` aus ("eine oder mehrere Varianten"). Formly macht daraus eine Mehrfachauswahl, deren
 * Wert ein Array ist – das einfache Select zeigt dann nichts an, und nach dem Hinzufügen eines Array-Eintrags waren
 * mehrere Varianten zugleich aktiv und überschrieben sich gegenseitig ihre Konstanten.
 * Gemeint ist bei einer Union genau eine Variante, daher wird jedes `anyOf` zu `oneOf`.
 */
function anyOfToOneOf(schema: any): any {
    if (Array.isArray(schema)) return schema.map(anyOfToOneOf);
    if (typeof schema !== "object" || schema === null) return schema;
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(schema)) result[key] = anyOfToOneOf(value);
    if (!Array.isArray(result["anyOf"]) || result["oneOf"]) return result;
    const { anyOf, ...rest } = result;
    return { ...rest, oneOf: anyOf };
}

/**
 * Bei Unions (anyOf/oneOf) zeigt Formly eine Auswahl mit dem `title` jeder Variante – liest ihn aber von der
 * unaufgelösten Variante (`{ $ref }`), nicht aus $defs. Daher bekommt jede $ref-Variante ohne eigenen Titel den
 * Titel ihrer Definition (`@summary`) bzw. den Model-Namen ("Control").
 * Nur an der Variante, nicht an $defs selbst – sonst würde der Model-Name auch das Label normaler Properties überschreiben.
 */
function titleUnionVariants(schema: any, root: any = schema): any {
    if (Array.isArray(schema)) return schema.map((s) => titleUnionVariants(s, root));
    if (typeof schema !== "object" || schema === null) return schema;
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(schema)) result[key] = titleUnionVariants(value, root);
    for (const mode of ["anyOf", "oneOf"]) {
        if (!Array.isArray(result[mode])) continue;
        result[mode] = result[mode].map((variant: any) => {
            const name = typeof variant?.$ref === "string" && variant.$ref.startsWith("#/$defs/") ? variant.$ref.slice(8) : undefined;
            if (!name || variant.title) return variant;
            return { ...variant, title: root.$defs?.[name]?.title ?? titleCase(name) };
        });
    }
    return result;
}

/**
 * Felder mit genau einem erlaubten Wert (z. B. `type: "control"` als Unterscheidungsmerkmal einer Union) sind keine
 * Eingabe: unsichtbar rendern, Wert aber setzen, damit er in den Daten steht.
 */
function toConstField(field: FormlyFieldConfig, schema: any): FormlyFieldConfig {
    if (!schema || !("const" in schema)) return field;
    return { ...field, type: "null", wrappers: [], defaultValue: schema.const };
}

/** Felder vom TypeSpec-Model File (x-file) bzw. File[] werden zu einem einzelnen Upload-Feld. */
function toFileField(field: FormlyFieldConfig, schema: any): FormlyFieldConfig {
    const multiple = schema.type === "array" && !!schema.items?.["x-file"];
    if (!schema["x-file"] && !multiple) return field;
    const { fieldGroup, fieldArray, defaultValue, ...rest } = field;
    return { ...rest, type: "file", props: { ...rest.props, multiple, accept: schema.accept } };
}

/** single: nur Formular, double: Formular + Daten, triple: zusätzlich der Quelltext. */
export type View = "single" | "double" | "triple";

@Component({
    selector: "mo-form",
    imports: [FormlyForm, ReactiveFormsModule, TablerIconComponent],
    providers: [FileStore],
    host: { class: "block h-full" },
    template: `
      <form #formEl [formGroup]="state().form" (ngSubmit)="onSubmit()" class="flex h-full min-h-0 flex-col gap-4 p-4">
        <div class="mx-auto max-w-4xl w-full flex justify-between">
            <h1 class="text-2xl font-bold">{{ state().title }}</h1>
            <div class="tabs tabs-sm tabs-box">
                @for (v of views; track v.value) {
                    <label class="tab" [title]="v.label">
                        <input type="radio" name="view" [value]="v.value" [attr.aria-label]="v.label"
                               [checked]="view() === v.value" (change)="view.set(v.value)">
                        <tabler-icon [icon]="v.icon"></tabler-icon>
                    </label>
                }
            </div>
        </div>
        <div class="divider m-0"></div>
        <!-- Nur ab hier scrollen; data-print-expand: der PDF-Export klappt den Bereich für den Screenshot auf -->
        <div data-print-expand class="mx-auto min-h-0 flex-1 overflow-y-auto px-4 max-w-4xl w-full">
            <formly-form [form]="state().form" [fields]="state().fields" [model]="state().model" (modelChange)="valueChange.emit($event)"></formly-form>
            <div class="flex justify-end">
                <button type="submit" class="btn btn-primary w-fit" [disabled]="exporting()">Submit</button>
            </div>
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
    /** Welche Panes der Editor zeigt; die Auswahl sitzt hier im Formular-Kopf. */
    view = model<View>("triple");
    protected readonly views: { value: View; icon: string; label: string }[] = [
        { value: "single", icon: "columns-1", label: "Nur Formular" },
        { value: "double", icon: "columns-2", label: "Formular und Daten" },
        { value: "triple", icon: "columns-3", label: "Quelltext, Formular und Daten" },
    ];
    /** Letztes Model, damit Eingaben über Schema-Änderungen erhalten bleiben. */
    private lastModel: any = {};
    /** Bei jedem neuen Schema eine frische FormGroup, sonst bleiben alte Controls hängen. */
    state = computed(() => {
        const schema = this.schema();
        const model = prune(this.lastModel, schema, schema) ?? {};
        this.lastModel = model;
        const root = new FormlyJsonschema().toFieldConfig(refsToAllOf(titleUnionVariants(anyOfToOneOf(schema))), {
            map: (field, fieldSchema) => {
                // Ohne @summary (-> "title") den Property-Namen als Label verwenden.
                if (!field.props?.label && typeof field.key === "string") {
                    field.props = { ...field.props, label: titleCase(field.key) };
                }
                // x-widget (z. B. "textarea" am Scalar text) wählt einen registrierten Formly-Typ.
                const widget = fieldSchema["x-widget"];
                if (typeof widget === "string" && this.formlyConfig.types[widget]) field.type = widget;
                return toConstField(toFileField(field, fieldSchema), fieldSchema);
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