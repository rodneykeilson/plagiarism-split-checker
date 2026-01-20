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
    
    try {
      const newResults = [];
      
      for (let i = 0; i < chunks.length; i++) {
        setCurrentChunk(i);
        
        // Simulate API call - in production, this would call your backend
        const result = await simulateCheckChunk(chunks[i].text);
        newResults.push(result);
        setResults([...newResults]); // Update UI progressively
      }
      
      setResults(newResults);
      
      // Calculate final percentage
      const chunksWithPlagiarism = chunks.map((chunk, index) => ({
        ...chunk,
        plagiarismPercentage: newResults[index].percentage
      }));
      
      const finalResult = calculateFinalPlagiarismPercentage(chunksWithPlagiarism);
      setFinalPercentage(finalResult);
      
      if (onResultsObtained) {
        onResultsObtained(chunksWithPlagiarism);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsChecking(false);
    }
  };
  
  // Simulation function - replace with actual API call
  const simulateCheckChunk = async (text) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      percentage: Math.floor(Math.random() * 30),
      text: text.substring(0, 50) + '...'
    };
  };

  return (
    <div className="automatic-checker-container">
      <h2>🤖 Automatic Plagiarism Checking</h2>
      
      <div className="automatic-checker-info">
        <p>
          <strong>⚠️ Demo Mode:</strong> This simulates automatic checking with random results.
        </p>
        <p>
          <strong>Production Implementation Would Require:</strong>
        </p>
        <ul>
          <li>Backend API server (Node.js/Express or Python/Flask)</li>
          <li>Web scraping with Puppeteer/Playwright or Selenium</li>
          <li>CAPTCHA handling solutions (2Captcha, Anti-Captcha)</li>
          <li>Rate limiting and retry logic</li>
          <li>Proxy rotation to avoid IP bans</li>
        </ul>
      </div>
      
      {!isChecking && results.length === 0 && (
        <button 
          onClick={startAutomaticCheck}
          className="automatic-check-button"
        >
          🚀 Start Automatic Check (Demo)
        </button>
      )}
      
      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {isChecking && (
        <div className="checking-status">
          <p className="checking-text">
            🔍 Checking chunk {currentChunk + 1} of {chunks.length}...
          </p>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${((currentChunk + 1) / chunks.length) * 100}%` }}
            />
          </div>
          <p className="progress-percentage">
            {Math.round(((currentChunk + 1) / chunks.length) * 100)}% Complete
          </p>
        </div>
      )}
      
      {results.length > 0 && !isChecking && (
        <div className="results-preview">
          <h3>✅ Checking Complete!</h3>
          <div className="results-list">
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <strong>Chunk {index + 1}:</strong> {result.percentage}% plagiarism
              </div>
            ))}
          </div>
          
          {finalPercentage !== null && (
            <div className="final-result">
              <h3>Final Result (Weighted Average)</h3>
              <p className="final-percentage-large">
                {finalPercentage.toFixed(2)}% Plagiarism
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AutomaticChecker; 