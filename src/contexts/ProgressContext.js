import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [savedProgress, setSavedProgress] = useState(() => {
    const saved = localStorage.getItem('plagiarismProgress');
    return saved ? JSON.parse(saved) : null;
  });

  const saveProgress = (data) => {
    localStorage.setItem('plagiarismProgress', JSON.stringify(data));
    setSavedProgress(data);
  };

  const clearProgress = () => {
    localStorage.removeItem('plagiarismProgress');
    setSavedProgress(null);
  };

  const loadProgress = () => {
    return savedProgress;
  };

  return (
    <ProgressContext.Provider value={{ saveProgress, clearProgress, loadProgress, savedProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
