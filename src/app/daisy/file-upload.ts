import { Component, ElementRef, input, model, signal, viewChild } from "@angular/core";

export type UploadFile = { id: string; file: File };

@Component({
    selector: 'mo-file',
    host:{
        class: "block w-full min-w-0",
    },
    template: `
    <div data-print-hide class="rounded-box border-2 border-dashed p-6 text-center transition-colors cursor-pointer"
    [class.border-base-300]="!dragging()"
    [class.bg-base-100]="!dragging()"
    [class.border-warning]="dragging()"
    [class.bg-warning/10]="dragging()"
    (click)="picker.click()"
    (dragenter)="onDragEnter($event)"
    (dragleave)="onDragLeave($event)"
    (dragover)="onDragOver($event)"
    (drop)="onDrop($event)"
    >
        <div class="size-8 mx-auto opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>
        </div>
        <p class="mt-2 text-sm font-medium">
            Dateien hierher ziehen oder <span class="text-warning">durchsuchen</span>
        </p>
        <p class="text-xs text-secondary mt-1">{{hint()}}</p>
        <input #picker type="file" class="hidden" [attr.accept]="accept()" [attr.multiple]="multiple() ? '' : null" (change)="onPick($event)">
    </div>

    @if (files().length) {
        <ul class="mt-3 flex flex-col gap-1.5">
            @for (item of files(); track item.id) {
                <li class="flex items-center gap-2 rounded-box bg-base-200 px-3 py-2 min-w-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file shrink-0"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" /></svg>
                    <span class="text-sm truncate grow min-w-0">{{item.file.name}}</span>
                    <span class="text-sm text-secondary shrink-0">{{formatSize(item.file.size)}}</span>
                    <button type="button" class="btn btn-ghost btn-square shrink-0 cursor-pointer" (click)="remove(item.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                    </button>
                </li>
            }
        </ul>
        
    }
    `,
    imports: [],
})
export class FileUpload {
    files = model<UploadFile[]>([]);
    accept = input("");
    hint = input("PNG, JPG oder PDF bis 10 MB");
    multiple = input(false);

    dragging = signal(false);
    picker = viewChild.required<ElementRef<HTMLInputElement>>("picker");
    private depth = 0;

    onDragEnter(event: DragEvent) {
        event.preventDefault();
        this.depth++;
        this.dragging.set(true);
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        this.depth--;
        if (this.depth <= 0) { this.depth = 0; this.dragging.set(false); }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        this.depth = 0;
        this.dragging.set(false);
        if (event.dataTransfer?.files) this.addFiles(event.dataTransfer.files);
    }

    onPick(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) this.addFiles(input.files);
        input.value = "";
    }

    addFiles(list: FileList) {
        const incoming = Array.from(list).map(file => ({ id: crypto.randomUUID(), file }));
        const next = this.multiple() ? [...this.files(), ...incoming] : incoming.slice(0, 1);
        this.files.set(next);
    }

    remove(id: string) {
        this.files.update(files => files.filter(file => file.id !== id));
    }

    formatSize(bytes: number): string {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 ** 2) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1024 ** 2).toFixed(1) + " MB";
    }

}