import { AfterViewInit, Component, computed, ElementRef, OnDestroy, signal, viewChild } from "@angular/core";
import { createBrowserHost, registerMonacoLanguage, type BrowserHost } from "@typespec/playground";
import * as monaco from "monaco-editor";
import { Form } from "./form";

const EMITTER = "@typespec/json-schema";
const OUTPUT_DIR = "/test/tsp-output";
const INITIAL_CODE = `import "@typespec/json-schema";
import "./file.tsp";
using JsonSchema;

@jsonSchema
model Foo {
    name: string;
    contract: File;
}
`;
/** Liegt neben main.tsp; das Formular rendert Felder vom Typ File (x-file) als Upload. */
const FILE_TSP = `import "@typespec/json-schema";
using JsonSchema;

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

@Component({
    selector: "mo-monaco",
    imports: [Form],
    template: `
    <div class="absolute inset-0 flex">
        <div #host class="relative h-full w-1/2"></div>
        <div class="relative flex h-full w-1/2 flex-col">
            @if (errors().length) {
                <pre class="m-0 max-h-1/3 overflow-auto bg-red-950 p-2 text-xs text-red-200">{{ errors().join("\n") }}</pre>
            }
            @if (schemaNames().length > 1) {
                <select class="select select-sm m-2 w-fit" [value]="current()" (change)="selected.set($any($event.target).value)">
                    @for (name of schemaNames(); track name) {
                        <option [value]="name">{{ name }}</option>
                    }
                </select>
            }
            <div class="flex-1 overflow-auto">
                @if (parsedSchema(); as schema) {
                    <mo-form [schema]="schema" />
                }
            </div>
        </div>
    </div>
    `,
})
export class Monaco implements AfterViewInit, OnDestroy {
    host = viewChild.required<ElementRef<HTMLDivElement>>("host");

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
    errors = signal<string[]>([]);

    private disposables: monaco.IDisposable[] = [];
    private compileRun = 0;

    async ngAfterViewInit() {
        const host = await createBrowserHost(["@typespec/compiler", EMITTER]);
        await host.writeFile("file.tsp", FILE_TSP);
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

        const editor = monaco.editor.create(this.host().nativeElement, {
            theme: "monang-dark",
            model,
            automaticLayout: true,
            "semanticHighlighting.enabled": true,
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
        );

        await update();
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

            this.errors.set(
                program.diagnostics
                    .filter((d) => d.severity === "error")
                    .map((d) => host.compiler.formatDiagnostic(d)),
            );
            if (program.hasError()) return undefined;

            // Pro @jsonSchema-Model schreibt der Emitter eine Datei <Name>.json; referenzierte
            // Models ohne @jsonSchema landen unter $defs im jeweiligen Dokument.
            const files = await host.readDir(OUTPUT_DIR).catch(() => [] as string[]);
            if (!files.length) {
                this.errors.set(["Kein Model mit @jsonSchema gefunden."]);
                return undefined;
            }
            const schemas: Record<string, string> = {};
            for (const file of files) schemas[file] = (await host.readFile(`${OUTPUT_DIR}/${file}`)).text;
            return schemas;
        } catch (error) {
            if (run === this.compileRun) this.errors.set([String(error)]);
            return undefined;
        }
    }
}
