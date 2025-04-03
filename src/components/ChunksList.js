import React, { useState } from 'react';

function ChunksList({ chunks }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text');
      });
  };

  return (
    <div className="chunks-container">
      <h2>Chunks to Check</h2>
      
      <div className="chunks-list">
        {chunks.map((chunk, index) => (
          <div key={index} className="chunk-card">
            <div className="chunk-header">
              <h3>
                Chunk {index + 1}/{chunks.length} ({chunk.wordCount} words)
              </h3>
              <button
                onClick={() => copyToClipboard(chunk.text, index)}
                className={`copy-button ${copiedIndex === index ? 'copied' : ''}`}
              >
                {copiedIndex === index ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <div className="chunk-preview">
              {chunk.text.substring(0, 150)}
              {chunk.text.length > 150 && '...'}
            </div>
          </div>
        ))}
      </div>
      
      <div className="chunks-instruction">
        <h3>How to use:</h3>
        <ol className="instruction-list">
          <li>Copy each chunk using the button above</li>
          <li>Paste into a free plagiarism checker (e.g., <a href="https://smallseotools.com/plagiarism-checker/" target="_blank" rel="noopener noreferrer">SmallSEOTools</a>, <a href="https://www.duplichecker.com/" target="_blank" rel="noopener noreferrer">DupliChecker</a>)</li>
          <li>Note the plagiarism percentage for each chunk</li>
          <li>Enter these percentages in Step 3</li>
        </ol>
      </div>
    </div>
  );
}

export default ChunksList;