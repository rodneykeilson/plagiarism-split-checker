import { splitTextIntoChunks, countWords } from './textSplitter';

describe('textSplitter utilities', () => {
  describe('countWords', () => {
    it('should count words correctly', () => {
      expect(countWords('Hello world')).toBe(2);
      expect(countWords('One two three four')).toBe(4);
      expect(countWords('  Spaces   everywhere  ')).toBe(2);
    });

    it('should handle empty strings', () => {
      expect(countWords('')).toBe(1); // split on empty string returns ['']
      expect(countWords('   ')).toBe(1);
    });

    it('should handle single words', () => {
      expect(countWords('Hello')).toBe(1);
    });
  });

  describe('splitTextIntoChunks', () => {
    it('should split text into chunks of specified size', () => {
      const text = Array(2500).fill('word').join(' ');
      const chunks = splitTextIntoChunks(text, 1000);
      
      expect(chunks).toHaveLength(3);
      expect(chunks[0].wordCount).toBe(1000);
      expect(chunks[1].wordCount).toBe(1000);
      expect(chunks[2].wordCount).toBe(500);
    });

    it('should handle text smaller than chunk size', () => {
      const text = 'This is a short text';
      const chunks = splitTextIntoChunks(text, 1000);
      
      expect(chunks).toHaveLength(1);
      expect(chunks[0].wordCount).toBe(5);
      expect(chunks[0].text).toBe(text);
    });

    it('should use default chunk size of 1000', () => {
      const text = Array(1500).fill('word').join(' ');
      const chunks = splitTextIntoChunks(text);
      
      expect(chunks).toHaveLength(2);
      expect(chunks[0].wordCount).toBe(1000);
      expect(chunks[1].wordCount).toBe(500);
    });

    it('should preserve text content', () => {
      const text = 'One two three four five';
      const chunks = splitTextIntoChunks(text, 3);
      
      expect(chunks[0].text).toBe('One two three');
      expect(chunks[1].text).toBe('four five');
    });

    it('should handle empty text', () => {
      const chunks = splitTextIntoChunks('', 1000);
      expect(chunks).toHaveLength(1);
      expect(chunks[0].wordCount).toBe(1);
    });
  });
});
