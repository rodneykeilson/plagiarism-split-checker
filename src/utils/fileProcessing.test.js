import { extractTextFromFile } from './fileProcessing';

// Mock FileReader
class MockFileReader {
  constructor() {
    this.onload = null;
    this.onerror = null;
    this.result = null;
  }

  readAsText(file) {
    setTimeout(() => {
      if (this.onload) {
        this.onload({ target: { result: 'Test file content' } });
      }
    }, 0);
  }

  readAsArrayBuffer(file) {
    setTimeout(() => {
      if (this.onload) {
        this.onload({ target: { result: new ArrayBuffer(8) } });
      }
    }, 0);
  }
}

global.FileReader = MockFileReader;

describe('fileProcessing utilities', () => {
  describe('extractTextFromFile', () => {
    it('should extract text from .txt files', async () => {
      const file = new File(['Hello World'], 'test.txt', { type: 'text/plain' });
      const result = await extractTextFromFile(file);
      expect(result).toBe('Test file content');
    });

    it('should reject unsupported file types', async () => {
      const file = new File(['data'], 'test.xyz', { type: 'application/octet-stream' });
      await expect(extractTextFromFile(file)).rejects.toThrow('Unsupported file format');
    });

    it('should handle file read errors', async () => {
      // Override FileReader to simulate error
      const originalFileReader = global.FileReader;
      class ErrorFileReader extends MockFileReader {
        readAsText(file) {
          setTimeout(() => {
            if (this.onerror) {
              this.onerror();
            }
          }, 0);
        }
      }
      global.FileReader = ErrorFileReader;

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      await expect(extractTextFromFile(file)).rejects.toThrow('Failed to read file');

      global.FileReader = originalFileReader;
    });
  });
});
