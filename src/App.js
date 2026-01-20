// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import TextSplitter from './components/TextSplitter';
import ChunksList from './components/ChunksList';
import PlagiarismInputForm from './components/PlagiarismInputForm';
import AutomaticChecker from './components/AutomaticChecker';
import ThemeToggle from './components/ThemeToggle';
import { useProgress } from './contexts/ProgressContext';

function App() {
  const [extractedText, setExtractedText] = useState('');
  const [chunks, setChunks] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [useAutomatic, setUseAutomatic] = useState(false);
  const [automaticResults, setAutomaticResults] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  
  const { saveProgress, loadProgress, clearProgress } = useProgress();

  // Load saved progress on mount
  useEffect(() => {
    const saved = loadProgress();
    if (saved && saved.extractedText) {
      setExtractedText(saved.extractedText);
      setChunks(saved.chunks || []);
      setCurrentStep(saved.currentStep || 1);
      setFinalResult(saved.finalResult || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save progress
  useEffect(() => {
    if (extractedText || chunks.length > 0) {
      const timeoutId = setTimeout(() => {
        saveProgress({
          extractedText,
          chunks,
          currentStep,
          finalResult,
          timestamp: Date.now()
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extractedText, chunks, currentStep, finalResult]);

  const handleTextExtracted = (text) => {
    setExtractedText(text);
    setCurrentStep(2);
  };

  const handleChunksGenerated = (generatedChunks) => {
    setChunks(generatedChunks);
    setCurrentStep(3);
  };

  const handleAutomaticResults = (results) => {
    setAutomaticResults(results.map(r => r.plagiarismPercentage));
    setCurrentStep(4);
  };

  const handleFinalResult = (percentage) => {
    setFinalResult(percentage);
  };

  const handleReset = () => {
    setExtractedText('');
    setChunks([]);
    setCurrentStep(1);
    setUseAutomatic(false);
    setAutomaticResults([]);
    setFinalResult(null);
    clearProgress();
  };

  const goToStep = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="App">
      <ThemeToggle />
      <header className="App-header">
        <h1>📄 Plagiarism Split Checker</h1>
        <p className="App-description">
          Split large documents, check plagiarism in chunks, and calculate accurate results
        </p>
      </header>
      
      {/* Progress Wizard */}
      <div className="wizard-progress">
        <div className={`wizard-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`} onClick={() => goToStep(1)}>
          <div className="step-number">1</div>
          <div className="step-label">Upload</div>
        </div>
        <div className="wizard-line"></div>
        <div className={`wizard-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`} onClick={() => goToStep(2)}>
          <div className="step-number">2</div>
          <div className="step-label">Split</div>
        </div>
        <div className="wizard-line"></div>
        <div className={`wizard-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`} onClick={() => goToStep(3)}>
          <div className="step-number">3</div>
          <div className="step-label">Check</div>
        </div>
        <div className="wizard-line"></div>
        <div className={`wizard-step ${currentStep >= 4 ? 'active' : ''}`}>
          <div className="step-number">4</div>
          <div className="step-label">Results</div>
        </div>
      </div>
      
      <main className="App-main">
        {/* Step 1: File Upload */}
        {currentStep === 1 && (
          <div className="wizard-content">
            <FileUploader onTextExtracted={handleTextExtracted} />
          </div>
        )}
        
        {/* Step 2: Text Splitting */}
        {currentStep === 2 && extractedText && (
          <div className="wizard-content">
            <TextSplitter 
              text={extractedText} 
              onChunksGenerated={handleChunksGenerated}
            />
            <button className="wizard-nav-button secondary" onClick={() => setCurrentStep(1)}>
              ← Back
            </button>
          </div>
        )}
        
        {/* Step 3: Choose Method & View Chunks */}
        {currentStep === 3 && chunks.length > 0 && (
          <div className="wizard-content">
            <div className="method-selector-card">
              <h2>Choose Checking Method</h2>
              <div className="method-options">
                <div 
                  className={`method-option ${!useAutomatic ? 'selected' : ''}`}
                  onClick={() => setUseAutomatic(false)}
                >
                  <div className="method-icon">✍️</div>
                  <h3>Manual Checking</h3>
                  <p>Copy chunks and check manually on free plagiarism checkers</p>
                </div>
                <div 
                  className={`method-option ${useAutomatic ? 'selected' : ''}`}
                  onClick={() => setUseAutomatic(true)}
                >
                  <div className="method-icon">🤖</div>
                  <h3>Automatic Checking</h3>
                  <p>Simulate automatic checking (demo mode)</p>
                </div>
              </div>
            </div>
            
            {!useAutomatic ? (
              <>
                <ChunksList chunks={chunks} />
                <div className="wizard-nav-buttons">
                  <button className="wizard-nav-button secondary" onClick={() => setCurrentStep(2)}>
                    ← Back
                  </button>
                  <button className="wizard-nav-button primary" onClick={() => setCurrentStep(4)}>
                    Continue to Results →
                  </button>
                </div>
              </>
            ) : (
              <>
                <AutomaticChecker chunks={chunks} onResultsObtained={handleAutomaticResults} />
                <button className="wizard-nav-button secondary" onClick={() => setCurrentStep(2)}>
                  ← Back
                </button>
              </>
            )}
          </div>
        )}
        
        {/* Step 4: Enter Results & Calculate */}
        {currentStep === 4 && chunks.length > 0 && (
          <div className="wizard-content">
            <PlagiarismInputForm 
              chunks={chunks}
              initialValues={automaticResults}
              onFinalResult={handleFinalResult}
            />
            <div className="wizard-nav-buttons">
              <button className="wizard-nav-button secondary" onClick={() => setCurrentStep(3)}>
                ← Back
              </button>
              <button className="wizard-nav-button" onClick={handleReset}>
                🔄 Start Over
              </button>
            </div>
          </div>
        )}
      </main>
      
      <footer className="App-footer">
        <p>© 2025 Plagiarism Split Checker • Made with ❤️ for students and researchers</p>
      </footer>
    </div>
  );
}

export default App;