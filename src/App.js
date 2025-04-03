// src/App.js

import React, { useState } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import TextSplitter from './components/TextSplitter';
import ChunksList from './components/ChunksList';
import PlagiarismInputForm from './components/PlagiarismInputForm';

function App() {
  const [extractedText, setExtractedText] = useState('');
  const [chunks, setChunks] = useState([]);

  const handleTextExtracted = (text) => {
    setExtractedText(text);
  };

  const handleChunksGenerated = (generatedChunks) => {
    setChunks(generatedChunks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Plagiarism Split Checker</h1>
        <p className="App-description">
          Split large documents, check plagiarism in small chunks, and calculate the final percentage.
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
            <ChunksList chunks={chunks} />
            <PlagiarismInputForm chunks={chunks} />
          </>
        )}
      </main>
      
      <footer className="App-footer">
        <p>© 2023 Plagiarism Split Checker</p>
      </footer>
    </div>
  );
}

export default App;