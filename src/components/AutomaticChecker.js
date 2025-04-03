import React, { useState } from 'react';
import { calculateFinalPlagiarismPercentage } from '../utils/plagiarismCalculator';

function AutomaticChecker({ chunks, onResultsObtained }) {
  const [isChecking, setIsChecking] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [results, setResults] = useState([]);
  const [finalPercentage, setFinalPercentage] = useState(null);
  const [error, setError] = useState(null);

  const startAutomaticCheck = async () => {
    if (isChecking) return;
    
    setIsChecking(true);
    setCurrentChunk(0);
    setResults([]);
    setFinalPercentage(null);
    setError(null);
    
    // This is a conceptual implementation
    // In reality, you would need a backend server to handle this
    try {
      const newResults = [];
      
      for (let i = 0; i < chunks.length; i++) {
        setCurrentChunk(i);
        
        // Simulate API call to your backend server
        // In a real implementation, your backend would submit to DupliChecker
        // and scrape/parse the results
        const result = await simulateCheckChunk(chunks[i].text);
        newResults.push(result);
      }
      
      setResults(newResults);
      
      // Calculate final percentage
      const chunksWithPlagiarism = chunks.map((chunk, index) => ({
        ...chunk,
        plagiarismPercentage: newResults[index].percentage
      }));
      
      const finalResult = calculateFinalPlagiarismPercentage(chunksWithPlagiarism);
      setFinalPercentage(finalResult);
      
      onResultsObtained(chunksWithPlagiarism);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsChecking(false);
    }
  };
  
  // This is just a simulation - in reality this would be an API call to your backend
  const simulateCheckChunk = async (text) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return a random percentage (for demo purposes only)
    return {
      percentage: Math.floor(Math.random() * 30),
      text: text.substring(0, 50) + '...'
    };
  };

  return (
    <div className="automatic-checker-container">
      <h2>Automatic Plagiarism Checking</h2>
      <div className="automatic-checker-info">
        <p>
          <strong>Note:</strong> This is a demonstration of how automatic checking could work.
          Implementing this feature would require a backend server to bypass CORS and handle
          the submission to DupliChecker.com.
        </p>
        <p>
          Full implementation would require:
        </p>
        <ul>
          <li>A server-side component to interact with plagiarism checking sites</li>
          <li>Puppeteer or similar browser automation library</li>
          <li>Handling of CAPTCHAs and rate limits</li>
          <li>Parsing of results from the HTML response</li>
        </ul>
      </div>
      
      <button 
        onClick={startAutomaticCheck}
        disabled={isChecking}
        className="automatic-check-button"
      >
        {isChecking ? 'Checking...' : 'Simulate Automatic Check'}
      </button>
      
      {isChecking && (
        <div className="checking-status">
          <p>Checking chunk {currentChunk + 1} of {chunks.length}...</p>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${((currentChunk + 1) / chunks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {results.length > 0 && (
        <div className="results-preview">
          <h3>Results Summary:</h3>
          <div className="results-list">
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <span>Chunk {index + 1}: {result.percentage}% plagiarism</span>
              </div>
            ))}
          </div>
          
          {finalPercentage !== null && (
            <div className="final-result">
              <h3>Final Weighted Result:</h3>
              <p className="final-percentage">
                {finalPercentage.toFixed(2)}% Plagiarism
              </p>
              <p className="result-explanation">
                This is a weighted average based on each chunk's word count.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AutomaticChecker; 