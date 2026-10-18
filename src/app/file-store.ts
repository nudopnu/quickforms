import { Injectable } from "@angular/core";

/** Verweis auf eine hochgeladene Datei, so wie er im Formular-Model steht (TypeSpec-Model `File`). */
export interface FileRef {
    name: string;
    mediaType: string;
    size: number;
    /** Name der Anlage im PDF und Schlüssel im FileStore. */
    attachment: string;
}

/** Hält die eigentlichen File-Objekte; im Model stehen nur FileRefs. Wird pro Formular bereitgestellt. */
@Injectable()
export class FileStore {
    private files = new Map<string, File>();

    get(attachment: string): File | undefined {
        return this.files.get(attachment);
    }

    set(attachment: string, file: File) {
        this.files.set(attachment, file);
    }

    delete(attachment: string) {
        this.files.delete(attachment);
    }
}

export function isFileRef(value: unknown): value is FileRef {
    return typeof value === "object" && value !== null && typeof (value as FileRef).attachment === "string";
}

/** Sammelt alle FileRefs im Model ein, egal wie tief verschachtelt. */
export function collectFileRefs(value: unknown, refs: FileRef[] = []): FileRef[] {
    if (isFileRef(value)) refs.push(value);
    else if (Array.isArray(value)) value.forEach((v) => collectFileRefs(v, refs));
    else if (typeof value === "object" && value !== null) Object.values(value).forEach((v) => collectFileRefs(v, refs));
    return refs;
}
