import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

export const extractTextFromFile = async (file) => {
    return new Promise((resolve, reject) => {
        const fileType = file.name.split('.').pop()?.toLowerCase();
        const reader = new FileReader();

        if (fileType === 'txt') {
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        } else if (fileType === 'docx') {
            reader.onload = async (e) => {
                try {
                    if (!e.target?.result) {
                        reject(new Error('Failed to read file'));
                        return;
                    }

                    const arrayBuffer = e.target.result;
                    const result = await mammoth.extractRawText({ arrayBuffer });
                    resolve(result.value);
                } catch (error) {
                    reject(new Error(`Error processing DOCX: ${error.message}`));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsArrayBuffer(file);
        } else if (fileType === 'pdf') {
            reader.onload = async (e) => {
                try {
                    if (!e.target?.result) {
                        reject(new Error('Failed to read file'));
                        return;
                    }

                    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
                    
                    const arrayBuffer = e.target.result;
                    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
                    const pdf = await loadingTask.promise;
                    
                    let fullText = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(' ');
                        fullText += pageText + '\n';
                    }
                    
                    resolve(fullText);
                } catch (error) {
                    reject(new Error(`Error processing PDF: ${error.message}`));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsArrayBuffer(file);
        } else {
            reject(new Error('Unsupported file format. Please upload a .txt, .docx, or .pdf file.'));
        }
    });
};