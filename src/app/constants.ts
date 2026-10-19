export const EMITTER = "@typespec/json-schema";
export const OUTPUT_DIR = "/test/tsp-output";
export const INITIAL_CODE = `import "@typespec/json-schema";
import "./forms.tsp";
using JsonSchema;

@jsonSchema
model Person {
  /** The person's first name. */
  firstName: string;

  /** The person's last name. */
  lastName: string;

  /** Age in years, which must be zero or greater. */
  @minValue(0)
  age: int32;

  /** The person's address. */
  address: Address;

  /** The person's nicknames. */
  @uniqueItems
  nickNames?: string[];

  /** Cars owned by the person. */
  cars?: Car[];
}

model Address {
  street: string;
  city: string;
  country: string;
}

model Car {
  kind: "ev" | "ice";
  brand: string;
  "model": string;
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

