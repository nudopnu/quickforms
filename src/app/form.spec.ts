import { TestBed } from '@angular/core/testing';
import { provideFormlyCore } from '@ngx-formly/core';
import {
  IconColumns1,
  IconColumns2,
  IconColumns3,
  IconPlus,
  IconX,
  provideTablerIcons,
} from '@tabler/icons-angular';
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

async function render() {
  TestBed.configureTestingModule({
    providers: [
      provideFormlyCore(daisyFormlyConfig),
      provideTablerIcons({ IconPlus, IconX, IconColumns1, IconColumns2, IconColumns3 }),
    ],
  });
  const fixture = TestBed.createComponent(Form);
  fixture.componentRef.setInput('schema', schema);
  const el: HTMLElement = fixture.nativeElement;
  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
  };
  const add = async () => {
    [...el.querySelectorAll('button')].find((b) => b.textContent?.includes('Hinzufügen'))!.click();
    await settle();
  };
  const pick = async (row: number, variant: string) => {
    const select = el.querySelectorAll('select')[row];
    select.selectedIndex = [...select.options].findIndex((o) => o.textContent?.trim() === variant);
    select.dispatchEvent(new Event('change'));
    await settle();
  };
  const selected = () =>
    [...el.querySelectorAll('select')].map((s) => s.selectedOptions[0]?.textContent?.trim());
  await settle();

  return { fixture, add, pick, selected };
}

describe('Form', () => {
  it('should keep the selected union variant of each array item', async () => {
    const { fixture, add, pick, selected } = await render();

    await add();
    await pick(0, 'Bun');
    await add();

    expect(selected()).toEqual(['Bun', 'Run']);
    expect(fixture.componentInstance.state().model).toEqual({
      steps: [{ type: 't22est' }, { type: 'test' }],
    });
  });

  it('should report the settled model after switching the union variant', async () => {
    const { fixture, add, pick } = await render();
    // Wie das Daten-Pane: der Stand zum Zeitpunkt der Meldung, undefined wird zu null.
    const emitted: unknown[] = [];
    fixture.componentInstance.valueChange.subscribe((v) =>
      emitted.push(JSON.parse(JSON.stringify(v))),
    );

    await add();
    await pick(0, 'Bun');
    await new Promise((resolve) => setTimeout(resolve));

    expect(emitted.at(-1)).toEqual({ steps: [{ type: 't22est' }] });
  });
});
