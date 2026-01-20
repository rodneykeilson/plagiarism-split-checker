import React, { useState, useEffect } from 'react';
import { splitTextIntoChunks } from '../utils/textSplitter';

function TextSplitter({ text, onChunksGenerated }) {
  const [maxWordsPerChunk, setMaxWordsPerChunk] = useState(1000);
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    if (text) {
      const generatedChunks = splitTextIntoChunks(text, maxWordsPerChunk);
      setChunks(generatedChunks);
      onChunksGenerated(generatedChunks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, maxWordsPerChunk]);

  return (
    <div className="splitter-container">
      <h2>✂️ Step 2: Configure Text Splitting</h2>
      
      <div className="input-group">
        <label htmlFor="max-words">
          Maximum Words Per Chunk:
        </label>
        <input
          type="number"
          id="max-words"
          min="100"
          max="5000"
          value={maxWordsPerChunk}
          onChange={(e) => setMaxWordsPerChunk(Math.max(100, parseInt(e.target.value) || 1000))}
        />
      </div>
      
      <div className="info-box">
        <p>
          ✅ Your text has been split into <strong>{chunks.length} chunk{chunks.length !== 1 ? 's' : ''}</strong>.
          {chunks.length > 0 && (
            <span> Total words: <strong>{chunks.reduce((sum, c) => sum + c.wordCount, 0)}</strong></span>
          )}
        </p>
      </div>
    </div>
  );
}

export default TextSplitter;