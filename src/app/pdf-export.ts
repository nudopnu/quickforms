import { domToCanvas } from 'modern-screenshot';
import { AFRelationship, PDFDocument } from 'pdf-lib';

// A4 in PDF-Punkten (1pt = 1/72 Zoll)
const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = 36;
// Feste Renderbreite, damit die Schrift im PDF unabhängig von der Bildschirmbreite lesbar bleibt
const RENDER_WIDTH_PX = 720;
const PRINT_THEME = 'corporate';

export interface PdfExportOptions {
  fileName: string;
  title?: string;
  schemaId?: string;
  data: unknown;
  /** Hochgeladene Dateien, die zusätzlich als Anlage ins PDF kommen. */
  attachments?: { name: string; file: File }[];
}

/** Rendert das Element als PDF, hängt die Daten als formdata.json an und startet den Download. */
export async function exportElementAsPdf(element: HTMLElement, opts: PdfExportOptions): Promise<void> {
  const canvas = await renderForPrint(element);
  const pdf = await PDFDocument.create();
  if (opts.title) pdf.setTitle(opts.title);
  pdf.setCreator('quickforms');

  const contentWidth = PAGE.width - 2 * MARGIN;
  const ptPerPx = contentWidth / canvas.width;
  const sliceHeightPx = Math.floor((PAGE.height - 2 * MARGIN) / ptPerPx);

  for (let y = 0; y < canvas.height; y += sliceHeightPx) {
    const h = Math.min(sliceHeightPx, canvas.height - y);
    const slice = document.createElement('canvas');
    slice.width = canvas.width;
    slice.height = h;
    slice.getContext('2d')!.drawImage(canvas, 0, y, canvas.width, h, 0, 0, canvas.width, h);

    const image = await pdf.embedPng(await canvasToPng(slice));
    pdf.addPage([PAGE.width, PAGE.height]).drawImage(image, {
      x: MARGIN,
      y: PAGE.height - MARGIN - h * ptPerPx,
      width: contentWidth,
      height: h * ptPerPx,
    });
  }

  const payload = { schema: opts.schemaId, createdAt: new Date().toISOString(), data: opts.data };
  await pdf.attach(new TextEncoder().encode(JSON.stringify(payload, null, 2)), 'formdata.json', {
    mimeType: 'application/json',
    description: 'Ausgefüllte Formulardaten',
    afRelationship: AFRelationship.Data,
    creationDate: new Date(),
    modificationDate: new Date(),
  });

  for (const { name, file } of opts.attachments ?? []) {
    await pdf.attach(new Uint8Array(await file.arrayBuffer()), name, {
      mimeType: file.type || 'application/octet-stream',
      description: file.name,
      afRelationship: AFRelationship.Supplement,
      creationDate: new Date(),
      modificationDate: new Date(file.lastModified),
    });
  }

  download(await pdf.save(), opts.fileName);
}

async function renderForPrint(element: HTMLElement): Promise<HTMLCanvasElement> {
  syncFormStateToAttributes(element);
  // Kurzzeitig helles Theme und feste Breite, damit das PDF unabhängig von Dark Mode und Viewport ist
  const prevTheme = element.getAttribute('data-theme');
  const prevWidth = element.style.width;
  const prevHeight = element.style.height;
  element.setAttribute('data-theme', PRINT_THEME);
  element.style.width = `${RENDER_WIDTH_PX}px`;
  // Scroll-Bereiche (data-print-expand) aufklappen, sonst landet nur der sichtbare Ausschnitt im PDF
  element.style.height = 'auto';
  const expanded = [...element.querySelectorAll<HTMLElement>('[data-print-expand]')].map((el) => {
    const prev = el.style.overflow;
    el.style.overflow = 'visible';
    return () => (el.style.overflow = prev);
  });
  try {
    return await domToCanvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      // Buttons (Submit, Hinzufügen, Entfernen) und Elemente mit data-print-hide (z. B. Drop-Zone) gehören nicht ins PDF
      filter: (node) =>
        !(node instanceof HTMLButtonElement) && !(node instanceof HTMLElement && node.hasAttribute('data-print-hide')),
    });
  } finally {
    if (prevTheme === null) element.removeAttribute('data-theme');
    else element.setAttribute('data-theme', prevTheme);
    element.style.width = prevWidth;
    element.style.height = prevHeight;
    expanded.forEach((restore) => restore());
  }
}

// modern-screenshot übernimmt nur input.value; Checkbox- und Select-Zustand stehen sonst nicht im Klon
function syncFormStateToAttributes(root: HTMLElement) {
  root.querySelectorAll('input[type=checkbox], input[type=radio]').forEach((el) => {
    (el as HTMLInputElement).toggleAttribute('checked', (el as HTMLInputElement).checked);
  });
  root.querySelectorAll('option').forEach((opt) => opt.toggleAttribute('selected', opt.selected));
  root.querySelectorAll('textarea').forEach((ta) => (ta.textContent = ta.value));
}

function canvasToPng(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? blob.arrayBuffer().then((b) => resolve(new Uint8Array(b)), reject) : reject(new Error('PNG-Export fehlgeschlagen'))),
      'image/png',
    ),
  );
}

function download(bytes: Uint8Array, fileName: string) {
  const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: 'application/pdf' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
