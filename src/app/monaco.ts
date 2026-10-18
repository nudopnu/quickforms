import { AfterViewInit, Component, computed, ElementRef, OnDestroy, signal, viewChild } from "@angular/core";
import type { Diagnostic } from "@typespec/compiler";
import { createBrowserHost, registerMonacoLanguage, type BrowserHost } from "@typespec/playground";
import * as monaco from "monaco-editor";
import { stringify } from "yaml";
import { Form } from "./form";

const EMITTER = "@typespec/json-schema";
const OUTPUT_DIR = "/test/tsp-output";
const INITIAL_CODE = `import "@typespec/json-schema";
import "./forms.tsp";
using JsonSchema;

@jsonSchema
model Foo {
    name: string;
    /** mehrzeilig */
    notes?: text;
    contract: File;
}
`;
/** Liegt neben main.tsp: Typen, die das Formular besonders darstellt (File -> Upload, text -> Textarea). */
const FORMS_TSP = `import "@typespec/json-schema";
using JsonSchema;

/** Mehrzeiliger Text, wird als Textarea dargestellt. */
@extension("x-widget", "textarea")
scalar text extends string;

/** Verweis auf eine Datei, die als Anlage im PDF liegt. */
@extension("x-file", true)
model File {
    /** Original-Dateiname */
    name: string;
    /** z. B. "application/pdf" */
    mediaType: string;
    /** Größe in Bytes */
    size: safeint;
    /** Name der Anlage im PDF */
    attachment: string;
}
`;

/** Ein Compiler-Fehler bzw. eine Warnung, aufbereitet für die Anzeige. */
interface Problem {
    severity: "error" | "warning";
    message: string;
    code?: string;
    /** Relativ zum Projekt, z. B. "main.tsp" */
    file?: string;
    /** 1-basiert */
    line?: number;
    column?: number;
}

@Component({
    selector: "mo-monaco",
    imports: [Form],
    template: `
    <div class="absolute inset-0 flex">
        <div #host class="relative h-full w-1/3"></div>
        <div class="relative flex h-full w-1/3 flex-col">
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
                    <mo-form [schema]="schema" (valueChange)="showData($event)" />
                }
            </div>
        </div>
        <div #data class="relative h-full w-1/3"></div>
    </div>
    `,
})
export class Monaco implements AfterViewInit, OnDestroy {
    host = viewChild.required<ElementRef<HTMLDivElement>>("host");
    data = viewChild.required<ElementRef<HTMLDivElement>>("data");
    /** Rechte Pane: aktuelle Formulardaten als YAML. */
    private dataModel?: monaco.editor.ITextModel;

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

    private editor?: monaco.editor.IStandaloneCodeEditor;

    private disposables: monaco.IDisposable[] = [];
    private compileRun = 0;

    async ngAfterViewInit() {
        const host = await createBrowserHost(["@typespec/compiler", EMITTER]);
        await host.writeFile("forms.tsp", FORMS_TSP);
        await registerMonacoLanguage(host);
        // typespec-dark färbt Decorators rosarot, was wie ein Fehler aussieht – daher VS-Code-Farben.
        monaco.editor.defineTheme("monang-dark", {
            base: "vs-dark",
            inherit: true,
            colors: {},
            rules: [
                { token: "macro", foreground: "#DCDCAA" },
                { token: "function", foreground: "#DCDCAA" },
            ],
        });

        const model = monaco.editor.createModel(
            INITIAL_CODE,
            "typespec",
            monaco.Uri.parse("inmemory://test/main.tsp"),
        );

        const editor = (this.editor = monaco.editor.create(this.host().nativeElement, {
            theme: "monang-dark",
            model,
            automaticLayout: true,
            "semanticHighlighting.enabled": true,
        }));

        this.dataModel = monaco.editor.createModel("", "yaml");
        const dataEditor = monaco.editor.create(this.data().nativeElement, {
            theme: "monang-dark",
            model: this.dataModel,
            readOnly: true,
            automaticLayout: true,
            minimap: { enabled: false },
        });

        let timer: ReturnType<typeof setTimeout> | undefined;
        const update = async () => {
            const schemas = await this.compile(host, model.getValue());
            if (schemas !== undefined) this.schemas.set(schemas);
        };

        this.disposables.push(
            model.onDidChangeContent(() => {
                clearTimeout(timer);
                timer = setTimeout(update, 300);
            }),
            { dispose: () => clearTimeout(timer) },
            editor,
            model,
            dataEditor,
            this.dataModel,
        );

        await update();
    }

    /** Springt im Editor zur Stelle des Problems. */
    reveal(problem: Problem) {
        if (!this.editor || !problem.line) return;
        const position = { lineNumber: problem.line, column: problem.column ?? 1 };
        this.editor.setPosition(position);
        this.editor.revealPositionInCenter(position);
        this.editor.focus();
    }

    showData(value: unknown) {
        this.dataModel?.setValue(stringify(value ?? {}));
    }

    ngOnDestroy() {
        this.disposables.forEach((d) => d.dispose());
    }

    /** Kompiliert den TypeSpec-Code und liefert die JSON Schemas aller @jsonSchema-Models (undefined bei Fehlern oder veraltetem Lauf). */
    private async compile(host: BrowserHost, content: string): Promise<Record<string, string> | undefined> {
        const run = ++this.compileRun;
        try {
            await host.writeFile("main.tsp", content);
            await host.rm(OUTPUT_DIR, { recursive: true });

            const program = await host.compiler.compile(host, "/test/main.tsp", {
                outputDir: OUTPUT_DIR,
                emit: [EMITTER],
                options: {
                    [EMITTER]: {
                        "emitter-output-dir": OUTPUT_DIR,
                        "file-type": "json",
                    },
                },
            });
            if (run !== this.compileRun) return undefined;

            this.problems.set(program.diagnostics.map((d) => toProblem(host, d)));
            if (program.hasError()) return undefined;

            // Pro @jsonSchema-Model schreibt der Emitter eine Datei <Name>.json; referenzierte
            // Models ohne @jsonSchema landen unter $defs im jeweiligen Dokument.
            const files = await host.readDir(OUTPUT_DIR).catch(() => [] as string[]);
            if (!files.length) {
                this.problems.set([{ severity: "error", message: "Kein Model mit @jsonSchema gefunden – mindestens ein Model braucht den Decorator @jsonSchema." }]);
                return undefined;
            }
            const schemas: Record<string, string> = {};
            for (const file of files) schemas[file] = (await host.readFile(`${OUTPUT_DIR}/${file}`)).text;
            return schemas;
        } catch (error) {
            console.error("Interner Compiler-Fehler", error);
            if (run === this.compileRun) {
                const message = error instanceof Error ? error.message : String(error);
                this.problems.set([{ severity: "error", message: `Interner Fehler: ${message} (Details in der Konsole)` }]);
            }
            return undefined;
        }
    }
}

/**
 * Bereitet ein Compiler-Diagnostic auf. Nicht compiler.formatDiagnostic verwenden: im Browser-Build ist das nur
 * JSON.stringify(diagnostic) und scheitert am zirkulären AST in diagnostic.target ("cyclic object value").
 */
function toProblem(host: BrowserHost, d: Diagnostic): Problem {
    const problem: Problem = { severity: d.severity, message: d.message, code: String(d.code) };
    try {
        const location = typeof d.target === "symbol" ? undefined : host.compiler.getSourceLocation(d.target);
        if (location && !location.isSynthetic) {
            const { line, character } = location.file.getLineAndCharacterOfPosition(location.pos);
            problem.file = location.file.path.replace(/^\/test\//, "");
            problem.line = line + 1;
            problem.column = character + 1;
        }
    } catch {
        // Ohne Position anzeigen
    }
    return problem;
}
