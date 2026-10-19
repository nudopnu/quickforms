import { afterNextRender, Component, DestroyRef, effect, ElementRef, inject, input, model, signal } from "@angular/core";
import * as monaco from "monaco-editor";

monaco.editor.defineTheme("monang-dark", {
    base: "vs-dark",
    inherit: true,
    colors: {},
    rules: [
        { token: "macro", foreground: "#DCDCAA" },
        { token: "function", foreground: "#DCDCAA" },
    ],
});

/**
 * Dünner Wrapper um einen Monaco-Editor mit Two-Way-Binding: [(value)].
 * Eingaben gehen entprellt nach außen, Änderungen von außen landen im Editor.
 */
@Component({
    selector: "mo-monaco",
    template: "",
})
export class Monaco {
    value = model("");
    language = input.required<string>();
    /**
     * Eindeutiger Pfad des Models, wird nur beim Anlegen gelesen. Monaco verwaltet Models global nach URI;
     * der TypeSpec-Language-Server findet Dateien nur unter inmemory:/ (z. B. "test/main.tsp" -> /test/main.tsp).
     */
    path = input.required<string>();
    options = input<monaco.editor.IStandaloneEditorConstructionOptions>({});
    debounce = input(300);

    private editor = signal<monaco.editor.IStandaloneCodeEditor | undefined>(undefined);
    /** Zuletzt nach außen gemeldeter Wert – kommt er zurück, darf er den weitergetippten Inhalt nicht überschreiben. */
    private emitted?: string;

    constructor() {
        const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
        const disposables: monaco.IDisposable[] = [];
        inject(DestroyRef).onDestroy(() => disposables.forEach((d) => d.dispose()));

        afterNextRender(() => {
            const model = monaco.editor.createModel(this.value(), this.language(), monaco.Uri.parse(`inmemory://${this.path()}`));
            const editor = monaco.editor.create(host, {
                theme: "monang-dark",
                automaticLayout: true,
                ...this.options(),
                model,
            });

            let timer: ReturnType<typeof setTimeout> | undefined;
            disposables.push(
                model.onDidChangeContent((e) => {
                    if (e.isFlush) return; // setValue() von außen, nicht zurückmelden
                    clearTimeout(timer);
                    timer = setTimeout(() => this.value.set((this.emitted = model.getValue())), this.debounce());
                }),
                { dispose: () => clearTimeout(timer) },
                editor,
                model,
            );
            this.editor.set(editor);
        });

        effect(() => {
            const model = this.editor()?.getModel();
            const value = this.value();
            if (model && value !== this.emitted && value !== model.getValue()) model.setValue(value);
        });
        effect(() => {
            const model = this.editor()?.getModel();
            if (model) monaco.editor.setModelLanguage(model, this.language());
        });
        effect(() => this.editor()?.updateOptions(this.options()));
    }

    /** Setzt den Cursor an die Stelle (1-basiert) und scrollt sie in die Mitte. */
    reveal(lineNumber: number, column = 1) {
        const editor = this.editor();
        if (!editor) return;
        editor.setPosition({ lineNumber, column });
        editor.revealPositionInCenter({ lineNumber, column });
        editor.focus();
    }
}
