"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfPreviewService = void 0;
const pdf_lib_1 = require("pdf-lib");
class PdfPreviewService {
    async generatePreview(buffer) {
        const pdfDoc = await pdf_lib_1.PDFDocument.load(buffer);
        const pages = pdfDoc.getPages();
        // Simplified: Just return the first page as a basic preview placeholder 
        // In production, use canvas/sharp to render page to image
        return buffer;
    }
}
exports.PdfPreviewService = PdfPreviewService;
//# sourceMappingURL=PdfPreviewService.js.map