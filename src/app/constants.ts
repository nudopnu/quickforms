export const EMITTER = "@typespec/json-schema";
export const OUTPUT_DIR = "/test/tsp-output";
export const INITIAL_CODE = `import "@typespec/json-schema";
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
export const FORMS_TSP = `import "@typespec/json-schema";
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

