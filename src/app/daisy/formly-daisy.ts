import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigOption, FieldArrayType, FieldType, FieldTypeConfig, FieldWrapper, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { TablerIconComponent } from '@tabler/icons-angular';
import { FileRef, FileStore, isFileRef } from '../file-store';
import { FileUpload, UploadFile } from './file-upload';

// Wrapper: Label + Beschreibung + Fehler
// Wrapper für Inputs und Selects
@Component({
    selector: 'daisy-form-field',
    standalone: true,
    imports: [FormlyModule],
    template: `
    <fieldset class="fieldset">
      @if (props.label) { <legend class="fieldset-legend">{{ props.label }}</legend> }
      <ng-container #fieldComponent />
      @if (showError) {
        <p class="label text-error"><formly-validation-message [field]="field" /></p>
      } @else if (props.description) {
        <p class="label">{{ props.description }}</p>
      }
    </fieldset>`,
})
export class DaisyFormFieldWrapper extends FieldWrapper { }

// Text- und Zahlenfelder
@Component({
    selector: 'daisy-input',
    standalone: true,
    imports: [ReactiveFormsModule, FormlyModule],
    template: `
    @if (props.type === 'number') {
      <input type="number" class="input w-full" [class.input-error]="showError"
             [formControl]="formControl" [formlyAttributes]="field" />
    } @else {
      <input [type]="props.type || 'text'" class="input w-full" [class.input-error]="showError"
             [formControl]="formControl" [formlyAttributes]="field" />
    }`,
})
export class DaisyInputType extends FieldType<FieldTypeConfig> { }

// Mehrzeiliger Text (TypeSpec-Scalar text, x-widget: textarea)
@Component({
    selector: 'daisy-textarea',
    standalone: true,
    imports: [ReactiveFormsModule, FormlyModule],
    template: `
    <textarea class="textarea w-full" [class.textarea-error]="showError" [rows]="props.rows ?? 4"
              [formControl]="formControl" [formlyAttributes]="field"></textarea>`,
})
export class DaisyTextareaType extends FieldType<FieldTypeConfig> { }

// Checkbox
@Component({
    selector: 'daisy-checkbox',
    standalone: true,
    imports: [ReactiveFormsModule, FormlyModule],
    template: `
    <label class="label cursor-pointer gap-3">
      <input type="checkbox" class="checkbox checkbox-primary"
             [formControl]="formControl" [formlyAttributes]="field" />
      <span>{{ props.label }}</span>
    </label>`,
})
export class DaisyCheckboxType extends FieldType<FieldTypeConfig> { }

// Select
@Component({
    selector: 'daisy-select',
    standalone: true,
    imports: [ReactiveFormsModule, FormlyModule, FormlySelectModule, AsyncPipe],
    template: `
    <select class="select w-full" [formControl]="formControl" [formlyAttributes]="field">
      <option [ngValue]="undefined" disabled>Bitte wählen</option>
      @for (opt of props.options | formlySelectOptions: field | async; track opt.value) {
        <option [ngValue]="opt.value">{{ opt.label }}</option>
      }
    </select>`,
})
export class DaisySelectType extends FieldType<FieldTypeConfig> { }

// Objekte und multischema
@Component({
  selector: 'daisy-object',
  standalone: true,
  imports: [FormlyModule],
  template: `
    <fieldset class="fieldset">
      @if (props.label) { <legend class="fieldset-legend">{{ props.label }}</legend> }
      @for (f of field.fieldGroup; track $index) { <formly-field [field]="f" /> }
      @if (showError && formControl.errors) {
        <p class="label text-error"><formly-validation-message [field]="field" /></p>
      } @else if (props.description) {
        <p class="label">{{ props.description }}</p>
      }
    </fieldset>`,
})
export class DaisyObjectType extends FieldType {}

// Arrays
@Component({
  selector: 'daisy-array',
  standalone: true,
  imports: [FormlyModule, TablerIconComponent],
  template: `
    <fieldset class="fieldset">
      @if (props.label) { <legend class="fieldset-legend">{{ props.label }}</legend> }
      @for (f of field.fieldGroup; track $index; let i = $index) {
        <div class="flex items-center gap-2">
          <formly-field class="flex-1" [field]="f" />
          <button type="button" class="btn btn-ghost btn-secondary btn-square" (click)="remove(i)" aria-label="Entfernen">
            <tabler-icon icon="x"></tabler-icon>
          </button>
        </div>
      }
      <button type="button" class="btn btn-sm btn-secondary btn-outline w-fit" (click)="add()">
        <tabler-icon icon="icon-plus"></tabler-icon>
        Hinzufügen
      </button>
      @if (props.description) { <p class="label">{{ props.description }}</p> }
    </fieldset>`,
})
export class DaisyArrayType extends FieldArrayType {
  // Formly-Eigenheit: Felder des gerade entfernten Eintrags (z. B. versteckte Konstanten einer Union-Variante wie
  // target: "pitch") schreiben ihren Wert beim Entfernen noch einmal über den alten Index ins Model. Danach stand
  // z. B. nach "alle löschen" noch [{ target: "pitch" }] im Model und "Hinzufügen" erzeugte zwei Einträge.
  // Alles hinter den tatsächlich vorhandenen Einträgen ist daher Rest und wird abgeschnitten – erst nach dem
  // Rendern, weil der Wert erst beim Abräumen der Felder geschrieben wird.
  override remove(i: number, opts?: { markAsDirty: boolean }) {
    super.remove(i, opts);
    setTimeout(() => {
      const length = this.field.fieldGroup?.length ?? 0;
      if (!Array.isArray(this.model) || this.model.length <= length) return;
      this.model.splice(length);
      // Damit formly-form modelChange (YAML-Pane) erneut meldet
      this.options.fieldChanges?.next({ field: this.field, type: 'valueChanges', value: this.model });
    });
  }
}

// Datei-Upload für TypeSpec-Model File (x-file). Wert im Model: FileRef bzw. FileRef[] bei multiple,
// die Dateien selbst liegen im FileStore.
@Component({
  selector: 'daisy-file',
  standalone: true,
  imports: [FileUpload],
  template: `
    <mo-file [files]="uploads()" (filesChange)="onChange($event)" [accept]="props['accept'] ?? ''"
             [multiple]="!!props['multiple']" [hint]="props['accept'] ? 'Erlaubt: ' + props['accept'] : 'Beliebige Dateien'" />`,
})
export class DaisyFileType extends FieldType<FieldTypeConfig> implements OnInit {
  private store = inject(FileStore);
  uploads = signal<UploadFile[]>([]);

  ngOnInit() {
    const value = this.formControl.value;
    const refs: unknown[] = Array.isArray(value) ? value : value ? [value] : [];
    this.uploads.set(
      refs.filter(isFileRef).flatMap((ref) => {
        const file = this.store.get(ref.attachment);
        return file ? [{ id: ref.attachment, file }] : [];
      }),
    );
  }

  onChange(uploads: UploadFile[]) {
    // Neue Dateien bekommen als id ihren eindeutigen Anlagennamen.
    const known = new Set(this.uploads().map((u) => u.id));
    const next = uploads.map((u) => (known.has(u.id) ? u : { id: `${u.id.slice(0, 8)}-${u.file.name}`, file: u.file }));
    const keep = new Set(next.map((u) => u.id));
    this.uploads().forEach((u) => keep.has(u.id) || this.store.delete(u.id));
    next.forEach((u) => this.store.set(u.id, u.file));
    this.uploads.set(next);

    const refs: FileRef[] = next.map((u) => ({ name: u.file.name, mediaType: u.file.type, size: u.file.size, attachment: u.id }));
    this.formControl.setValue(this.props['multiple'] ? refs : refs[0]);
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();
  }
}

// null: rendert nichts
@Component({ selector: 'daisy-null', standalone: true, template: `` })
export class DaisyNullType extends FieldType { }

export const daisyFormlyConfig: ConfigOption = {
    wrappers: [{ name: 'form-field', component: DaisyFormFieldWrapper }],
    types: [
        // Basis-Typen
        { name: 'input', component: DaisyInputType, wrappers: ['form-field'] },
        { name: 'textarea', component: DaisyTextareaType, wrappers: ['form-field'] },
        { name: 'checkbox', component: DaisyCheckboxType },
        { name: 'select', component: DaisySelectType, wrappers: ['form-field'] },
        // JSON-Schema-Typen
        { name: 'string', extends: 'input' },
        { name: 'number', extends: 'input', defaultOptions: { props: { type: 'number' } } },
        { name: 'integer', extends: 'input', defaultOptions: { props: { type: 'number' } } },
        { name: 'boolean', extends: 'checkbox' },
        { name: 'enum', extends: 'select' },
        { name: 'object', component: DaisyObjectType },
        { name: 'multischema', component: DaisyObjectType },
        { name: 'array', component: DaisyArrayType },
        { name: 'null', component: DaisyNullType },
        { name: 'file', component: DaisyFileType, wrappers: ['form-field'] },
    ],
    validationMessages: [
        { name: 'required', message: 'Pflichtfeld' },
        // Formly mappt JSON-Schema minimum/maximum auf die Validatoren "min"/"max".
        { name: 'min', message: (_: unknown, f: FormlyFieldConfig) => `Mindestens ${f.props?.min}` },
        { name: 'max', message: (_: unknown, f: FormlyFieldConfig) => `Höchstens ${f.props?.max}` },
        { name: 'minLength', message: (_: unknown, f: FormlyFieldConfig) => `Mindestens ${f.props?.minLength} Zeichen` },
        { name: 'maxLength', message: (_: unknown, f: FormlyFieldConfig) => `Höchstens ${f.props?.maxLength} Zeichen` },
        { name: 'pattern', message: 'Ungültiges Format' },
    ],
};