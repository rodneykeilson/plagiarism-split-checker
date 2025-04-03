/**
 * Calculate the final plagiarism percentage using weighted average
 * @param {Array} chunks Array of chunks with their plagiarism percentage and word count
 * @returns {number} Final weighted plagiarism percentage
 */
export const calculateFinalPlagiarismPercentage = (chunks) => {
    // Calculate weighted sum of plagiarism percentages
    const weightedSum = chunks.reduce(
      (sum, chunk) => sum + chunk.plagiarismPercentage * chunk.wordCount,
      0
    );
    
    // Calculate total word count
    const totalWordCount = chunks.reduce(
      (total, chunk) => total + chunk.wordCount,
      0
    );
    
    // Calculate weighted average
    return totalWordCount > 0 ? weightedSum / totalWordCount : 0;
  };