/**
 * Splits text into chunks of a maximum word count
 * @param {string} text Full text to split
 * @param {number} maxWordsPerChunk Maximum number of words per chunk (default: 1000)
 * @returns {Array} Array of text chunks with their word counts
 */
export const splitTextIntoChunks = (text, maxWordsPerChunk = 1000) => {
    // Remove extra whitespace and split into words
    const words = text.trim().split(/\s+/);
    const chunks = [];
    
    // Create chunks
    for (let i = 0; i < words.length; i += maxWordsPerChunk) {
      const chunkWords = words.slice(i, i + maxWordsPerChunk);
      chunks.push({
        text: chunkWords.join(' '),
        wordCount: chunkWords.length
      });
    }
    
    return chunks;
  };
  
  /**
   * Count total words in a text
   * @param {string} text Text to count words in
   * @returns {number} Total word count
   */
  export const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };