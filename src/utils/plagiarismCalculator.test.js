import { calculateFinalPlagiarismPercentage } from './plagiarismCalculator';

describe('plagiarismCalculator utilities', () => {
  describe('calculateFinalPlagiarismPercentage', () => {
    it('should calculate weighted average correctly', () => {
      const chunks = [
        { wordCount: 1000, plagiarismPercentage: 10 },
        { wordCount: 1000, plagiarismPercentage: 20 },
        { wordCount: 500, plagiarismPercentage: 30 }
      ];

      // (10*1000 + 20*1000 + 30*500) / 2500 = 45000 / 2500 = 18
      const result = calculateFinalPlagiarismPercentage(chunks);
      expect(result).toBe(18);
    });

    it('should handle equal-sized chunks', () => {
      const chunks = [
        { wordCount: 100, plagiarismPercentage: 25 },
        { wordCount: 100, plagiarismPercentage: 75 }
      ];

      const result = calculateFinalPlagiarismPercentage(chunks);
      expect(result).toBe(50);
    });

    it('should handle zero plagiarism', () => {
      const chunks = [
        { wordCount: 500, plagiarismPercentage: 0 },
        { wordCount: 500, plagiarismPercentage: 0 }
      ];

      const result = calculateFinalPlagiarismPercentage(chunks);
      expect(result).toBe(0);
    });

    it('should handle 100% plagiarism', () => {
      const chunks = [
        { wordCount: 300, plagiarismPercentage: 100 },
        { wordCount: 700, plagiarismPercentage: 100 }
      ];

      const result = calculateFinalPlagiarismPercentage(chunks);
      expect(result).toBe(100);
    });

    it('should weight larger chunks more heavily', () => {
      const chunks = [
        { wordCount: 100, plagiarismPercentage: 0 },
        { wordCount: 900, plagiarismPercentage: 50 }
      ];

      // (0*100 + 50*900) / 1000 = 45
      const result = calculateFinalPlagiarismPercentage(chunks);
      expect(result).toBe(45);
    });

    it('should handle empty chunks array', () => {
      const result = calculateFinalPlagiarismPercentage([]);
      expect(result).toBe(0);
    });

    it('should handle single chunk', () => {
      const chunks = [{ wordCount: 500, plagiarismPercentage: 35 }];
      const result = calculateFinalPlagiarismPercentage(chunks);
      expect(result).toBe(35);
    });
  });
});
