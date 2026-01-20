import React, { useState, useRef } from 'react';
import { extractTextFromFile } from '../utils/fileProcessing';

function FileUploader({ onTextExtracted }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = async (file) => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const text = await extractTextFromFile(file);
      onTextExtracted(text);
    } catch (err) {
      setError(err.message || 'An error occurred processing the file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    processFile(files[0]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="uploader-container">
      <h2>📤 Step 1: Upload Document</h2>
      <div 
        className={`upload-box ${isDragging ? 'dragging' : ''} ${isProcessing ? 'processing' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!isProcessing ? handleClick : undefined}
        style={{ cursor: isProcessing ? 'wait' : 'pointer' }}
      >
        <input
          type="file"
          accept=".txt,.docx,.pdf"
          onChange={handleFileUpload}
          id="file-upload"
          ref={fileInputRef}
          disabled={isProcessing}
          style={{ display: 'none' }}
        />
        <div className="upload-content">
          <div className="upload-icon">{isProcessing ? '⏳' : '📄'}</div>
          <p className="upload-text">
            {isProcessing ? 'Processing your file...' : 'Drag & drop your file here or click to browse'}
          </p>
          <p className="upload-hint">
            {isProcessing ? 'This may take a few moments for large files' : 'Supports .txt, .docx, and .pdf files'}
          </p>
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          <strong>❌ Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

export default FileUploader;