import { TestBed } from '@angular/core/testing';
import { provideFormlyCore } from '@ngx-formly/core';
import { IconPlus, IconX, provideTablerIcons } from '@tabler/icons-angular';
import { daisyFormlyConfig } from './daisy/formly-daisy';
import { Form } from './form';

// So gibt der JSON-Schema-Emitter `steps: (Run | Bun)[]` aus.
const schema = {
  type: 'object',
  properties: {
    steps: { type: 'array', items: { anyOf: [{ $ref: '#/$defs/Run' }, { $ref: '#/$defs/Bun' }] } },
  },
  $defs: {
    Run: {
      type: 'object',
      properties: { type: { type: 'string', const: 'test' } },
      required: ['type'],
    },
    Bun: {
      type: 'object',
      properties: { type: { type: 'string', const: 't22est' } },
      required: ['type'],
    },
  },
};

describe('Form', () => {
  it('should keep the selected union variant of each array item', async () => {
    TestBed.configureTestingModule({
      providers: [provideFormlyCore(daisyFormlyConfig), provideTablerIcons({ IconPlus, IconX })],
    });
    const fixture = TestBed.createComponent(Form);
    fixture.componentRef.setInput('schema', schema);
    const el: HTMLElement = fixture.nativeElement;
    const settle = async () => {
      fixture.detectChanges();
      await fixture.whenStable();
    };
    const add = async () => {
      [...el.querySelectorAll('button')]
        .find((b) => b.textContent?.includes('Hinzufügen'))!
        .click();
      await settle();
    };
    const selected = () =>
      [...el.querySelectorAll('select')].map((s) => s.selectedOptions[0]?.textContent?.trim());
    await settle();

    await add();
    const select = el.querySelector('select')!;
    select.selectedIndex = [...select.options].findIndex((o) => o.textContent?.trim() === 'Bun');
    select.dispatchEvent(new Event('change'));
    await settle();
    await add();

    expect(selected()).toEqual(['Bun', 'Run']);
    expect(fixture.componentInstance.state().model).toEqual({
      steps: [{ type: 't22est' }, { type: 'test' }],
    });
  });
});
