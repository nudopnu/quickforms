import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigOption, FieldArrayType, FieldType, FieldTypeConfig, FieldWrapper, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { TablerIconComponent } from '@tabler/icons-angular';

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
export class DaisyArrayType extends FieldArrayType {}

// null: rendert nichts
@Component({ selector: 'daisy-null', standalone: true, template: `` })
export class DaisyNullType extends FieldType { }

export const daisyFormlyConfig: ConfigOption = {
    wrappers: [{ name: 'form-field', component: DaisyFormFieldWrapper }],
    types: [
        // Basis-Typen
        { name: 'input', component: DaisyInputType, wrappers: ['form-field'] },
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