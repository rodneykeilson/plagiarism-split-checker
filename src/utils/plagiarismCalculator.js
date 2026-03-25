export const calculateFinalPlagiarismPercentage = (chunks) => {
    const weightedSum = chunks.reduce(
      (sum, chunk) => sum + chunk.plagiarismPercentage * chunk.wordCount,
      0
    );

    const totalWordCount = chunks.reduce(
      (total, chunk) => total + chunk.wordCount,
      0
    );

    return totalWordCount > 0 ? weightedSum / totalWordCount : 0;
  };