import { Component, computed, effect, inject, signal, viewChild } from "@angular/core";
import { stringify } from "yaml";
import { Form, type View } from "./form";
import { INITIAL_CODE } from "./constants";
import { Monaco } from "./monaco";
import { TypeSpec, type Problem } from "./typespec";

@Component({
    selector: "mo-editor",
    imports: [Form, Monaco],
    template: `
    <!-- Ausgeblendet per CSS statt @if, damit der Quelltext-Editor Cursor und Undo-Verlauf behält -->
    <div class="absolute inset-0 flex">
        <div class="relative h-full min-w-0 flex-1" [class.hidden]="view() !== 'triple'">
            @if (ready()) {
                <mo-monaco #sourceEditor class="absolute inset-0"
                    [(value)]="source"
                    language="typespec"
                    path="test/main.tsp"
                    [options]="{ 'semanticHighlighting.enabled': true }"
                />
            }
        </div>
        <div class="relative flex h-full min-w-0 flex-1 flex-col">
            @if (problems().length) {
                <div class="max-h-1/3 shrink-0 overflow-auto border-b border-base-300 bg-base-200 text-xs">
                    @if (errorCount()) {
                        <div class="px-3 py-1.5 font-semibold text-error">
                            {{ errorCount() }} Fehler
                            @if (parsedSchema()) { <span class="font-normal opacity-70">– Formular zeigt den letzten gültigen Stand</span> }
                        </div>
                    }
                    <ul>
                        @for (p of problems(); track $index) {
                            <li>
                                <button type="button" class="flex w-full items-baseline gap-2 px-3 py-1 text-left enabled:cursor-pointer enabled:hover:bg-base-300"
                                        [disabled]="p.file !== 'main.tsp' || !p.line" (click)="reveal(p)">
                                    <span class="shrink-0 font-semibold" [class.text-error]="p.severity === 'error'" [class.text-warning]="p.severity === 'warning'">
                                        {{ p.severity === "error" ? "Fehler" : "Warnung" }}
                                    </span>
                                    @if (p.line) { <span class="shrink-0 font-mono opacity-60">{{ p.file }}:{{ p.line }}:{{ p.column }}</span> }
                                    <span class="grow">{{ p.message }}</span>
                                    @if (p.code) { <span class="shrink-0 font-mono opacity-50">{{ p.code }}</span> }
                                </button>
                            </li>
                        }
                    </ul>
                </div>
            }
            @if (schemaNames().length > 1) {
                <select class="select select-sm m-2 w-fit" [value]="current()" (change)="selected.set($any($event.target).value)">
                    @for (name of schemaNames(); track name) {
                        <option [value]="name">{{ name }}</option>
                    }
                </select>
            }
            <div class="min-h-0 flex-1">
                @if (parsedSchema(); as schema) {
                    <mo-form [schema]="schema" [(view)]="view" (valueChange)="showData($event)" />
                }
            </div>
        </div>
        <mo-monaco class="relative h-full min-w-0 flex-1" [class.hidden]="view() === 'single'"
            [value]="data()"
            language="yaml"
            path="test/data.yaml"
            [options]="{ readOnly: true, minimap: { enabled: false } }"
        />
    </div>
    `,
})
export class Editor {
    private typespec = inject(TypeSpec);
    private sourceEditor = viewChild<Monaco>("sourceEditor");

    /** Erst wenn die Sprache "typespec" registriert ist, darf der Quelltext-Editor entstehen. */
    ready = signal(false);
    /** Linke Pane: TypeSpec-Quelltext. */
    source = signal(INITIAL_CODE);
    /** Rechte Pane: aktuelle Formulardaten als YAML. */
    data = signal("");
    view = signal<View>("triple");

    /** Zuletzt erzeugte JSON Schemas aller Models mit @jsonSchema, nach Dateiname. */
    schemas = signal<Record<string, string>>({});
    schemaNames = computed(() => Object.keys(this.schemas()));
    /** Vom Benutzer gewähltes Schema, falls mehrere Models @jsonSchema tragen. */
    selected = signal<string | undefined>(undefined);
    current = computed(() => {
        const selected = this.selected();
        return selected && this.schemaNames().includes(selected) ? selected : this.schemaNames()[0];
    });
    parsedSchema = computed(() => {
        const schema = this.schemas()[this.current()];
        return schema ? JSON.parse(schema) : undefined;
    });
    problems = signal<Problem[]>([]);
    errorCount = computed(() => this.problems().filter((p) => p.severity === "error").length);

    constructor() {
        this.typespec.init().then(() => this.ready.set(true));
        effect(async () => {
            const result = await this.typespec.compile(this.source());
            if (!result) return;
            this.problems.set(result.problems);
            if (result.schemas) this.schemas.set(result.schemas);
        });
    }

    /** Springt im Editor zur Stelle des Problems. */
    reveal(problem: Problem) {
        if (problem.line) this.sourceEditor()?.reveal(problem.line, problem.column);
    }

    showData(value: unknown) {
        // Formly mutiert das Model in place – daher den String speichern, nicht das Objekt.
        this.data.set(stringify(value ?? {}));
    }
}
