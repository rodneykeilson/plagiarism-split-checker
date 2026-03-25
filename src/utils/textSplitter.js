export const splitTextIntoChunks = (text, maxWordsPerChunk = 1000) => {
    const words = text.trim().split(/\s+/);
    const chunks = [];

    for (let i = 0; i < words.length; i += maxWordsPerChunk) {
      const chunkWords = words.slice(i, i + maxWordsPerChunk);
      chunks.push({
        text: chunkWords.join(' '),
        wordCount: chunkWords.length
      });
    }
    
    return chunks;
  };

  export const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };