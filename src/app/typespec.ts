import { Injectable } from "@angular/core";
import type { Diagnostic } from "@typespec/compiler";
import { createBrowserHost, registerMonacoLanguage, type BrowserHost } from "@typespec/playground";
import { EMITTER, FORMS_TSP, OUTPUT_DIR } from "./constants";

/** Ein Compiler-Fehler bzw. eine Warnung, aufbereitet für die Anzeige. */
export interface Problem {
    severity: "error" | "warning";
    message: string;
    code?: string;
    /** Relativ zum Projekt, z. B. "main.tsp" */
    file?: string;
    /** 1-basiert */
    line?: number;
    column?: number;
}

export interface CompileResult {
    problems: Problem[];
    /** JSON Schemas aller Models mit @jsonSchema, nach Dateiname; undefined bei Fehlern. */
    schemas?: Record<string, string>;
}

/**
 * TypeSpec-Compiler im Browser. Lädt Compiler und Emitter beim ersten init() und registriert die Sprache "typespec"
 * in Monaco – erst danach dürfen Editoren mit dieser Sprache entstehen.
 */
@Injectable({ providedIn: "root" })
export class TypeSpec {
    private host?: Promise<BrowserHost>;
    private compileRun = 0;

    /** Idempotent: alle Aufrufer teilen sich denselben Host. */
    init(): Promise<BrowserHost> {
        return (this.host ??= this.createHost());
    }

    private async createHost() {
        const host = await createBrowserHost(["@typespec/compiler", EMITTER]);
        await host.writeFile("forms.tsp", FORMS_TSP);
        await registerMonacoLanguage(host);
        return host;
    }

    /** Kompiliert main.tsp; undefined, wenn inzwischen ein neuerer Lauf gestartet wurde. */
    async compile(content: string): Promise<CompileResult | undefined> {
        const run = ++this.compileRun;
        const host = await this.init();
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

            const problems = program.diagnostics.map((d) => toProblem(host, d));
            if (program.hasError()) return { problems };

            // Pro @jsonSchema-Model schreibt der Emitter eine Datei <Name>.json; referenzierte
            // Models ohne @jsonSchema landen unter $defs im jeweiligen Dokument.
            const files = await host.readDir(OUTPUT_DIR).catch(() => [] as string[]);
            if (!files.length) {
                return { problems: [{ severity: "error", message: "Kein Model mit @jsonSchema gefunden – mindestens ein Model braucht den Decorator @jsonSchema." }] };
            }
            const schemas: Record<string, string> = {};
            for (const file of files) schemas[file] = (await host.readFile(`${OUTPUT_DIR}/${file}`)).text;
            if (run !== this.compileRun) return undefined;
            return { problems, schemas };
        } catch (error) {
            console.error("Interner Compiler-Fehler", error);
            if (run !== this.compileRun) return undefined;
            const message = error instanceof Error ? error.message : String(error);
            return { problems: [{ severity: "error", message: `Interner Fehler: ${message} (Details in der Konsole)` }] };
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
