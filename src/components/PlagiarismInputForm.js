import React, { useState, useEffect } from 'react';
import { calculateFinalPlagiarismPercentage } from '../utils/plagiarismCalculator';

function PlagiarismInputForm({ chunks, initialValues }) {
  const [plagiarismValues, setPlagiarismValues] = useState(
    Object.fromEntries(chunks.map((_, index) => [index, 0]))
  );
  const [finalPercentage, setFinalPercentage] = useState(null);

  // Update plagiarism values when initialValues changes
  useEffect(() => {
    if (initialValues && initialValues.length > 0) {
      const newValues = Object.fromEntries(
        initialValues.map((value, index) => [index, value])
      );
      setPlagiarismValues(newValues);
      
      // Also calculate final result if we have initial values
      const chunksWithPlagiarism = chunks.map((chunk, index) => ({
        ...chunk,
        plagiarismPercentage: initialValues[index] || 0
      }));
      
      const result = calculateFinalPlagiarismPercentage(chunksWithPlagiarism);
      setFinalPercentage(result);
    }
  }, [initialValues, chunks]);

  const handlePlagiarismChange = (index, value) => {
    const numValue = Math.min(100, Math.max(0, parseFloat(value) || 0));
    setPlagiarismValues(prev => ({ ...prev, [index]: numValue }));
  };

  const calculateFinalResult = () => {
    const chunksWithPlagiarism = chunks.map((chunk, index) => ({
      ...chunk,
      plagiarismPercentage: plagiarismValues[index] || 0
    }));
    
    const result = calculateFinalPlagiarismPercentage(chunksWithPlagiarism);
    setFinalPercentage(result);
  };

  return (
    <div className="plagiarism-form-container">
      <h2>Step 3: Enter Plagiarism Results</h2>
      
      {initialValues && initialValues.length > 0 && (
        <div className="auto-values-notice">
          <p>Values from automatic checking have been applied. You can adjust them if needed.</p>
        </div>
      )}
      
      <div className="plagiarism-inputs">
        {chunks.map((chunk, index) => (
          <div key={index} className="plagiarism-input-group">
            <span className="chunk-label">
              Chunk {index + 1} ({chunk.wordCount} words):
            </span>
            <input
              type="number"
              min="0"
              max="100"
              value={plagiarismValues[index] || ""}
              onChange={(e) => handlePlagiarismChange(index, e.target.value)}
              className="percentage-input"
            />
            <span className="percentage-symbol">%</span>
          </div>
        ))}
      </div>
      
      <button
        onClick={calculateFinalResult}
        className="calculate-button"
      >
        Calculate Final Plagiarism Percentage
      </button>
      
      {finalPercentage !== null && (
        <div className="result-container">
          <h3>Final Result:</h3>
          <p className="final-percentage">
            {finalPercentage.toFixed(2)}% Plagiarism
          </p>
          <p className="result-explanation">
            This is a weighted average based on each chunk's word count.
          </p>
        </div>
      )}
    </div>
  );
}

export default PlagiarismInputForm;