// src/App.js

import React, { useState } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import TextSplitter from './components/TextSplitter';
import ChunksList from './components/ChunksList';
import PlagiarismInputForm from './components/PlagiarismInputForm';
import AutomaticChecker from './components/AutomaticChecker';

function App() {
  const [extractedText, setExtractedText] = useState('');
  const [chunks, setChunks] = useState([]);
  const [autoResults, setAutoResults] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleTextExtracted = (text) => {
    setExtractedText(text);
  };

  const handleChunksGenerated = (generatedChunks) => {
    setChunks(generatedChunks);
  };

  const handleAutomaticResults = (results) => {
    setAutoResults(results);
  };

  // Handle switch between manual and automatic mode
  const handleModeSwitch = (showAdvanced) => {
    setShowAdvanced(showAdvanced);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Plagiarism Split Checker</h1>
        <p className="App-description">
          Split large documents, check plagiarism in chunks, and calculate the final percentage.
        </p>
      </header>
      
      <main className="App-main">
        <FileUploader onTextExtracted={handleTextExtracted} />
        
        {extractedText && (
          <TextSplitter 
            text={extractedText} 
            onChunksGenerated={handleChunksGenerated} 
          />
        )}
        
        {chunks.length > 0 && (
          <>
            <div className="method-selector">
              <button 
                className={`method-button ${!showAdvanced ? 'active' : ''}`}
                onClick={() => handleModeSwitch(false)}
              >
                Manual Checking
              </button>
              <button 
                className={`method-button ${showAdvanced ? 'active' : ''}`}
                onClick={() => handleModeSwitch(true)}
              >
                Automatic Checking (Experimental)
              </button>
            </div>
            
            {!showAdvanced ? (
              <>
                <ChunksList chunks={chunks} />
                <PlagiarismInputForm 
                  chunks={chunks} 
                  initialValues={autoResults.length > 0 ? 
                    autoResults.map(result => result.plagiarismPercentage) : 
                    undefined}
                />
              </>
            ) : (
              <AutomaticChecker 
                chunks={chunks} 
                onResultsObtained={handleAutomaticResults}
              />
            )}
          </>
        )}
      </main>
      
      <footer className="App-footer">
        <p>© 2025 Plagiarism Split Checker</p>
      </footer>
    </div>
  );
}

export default App;