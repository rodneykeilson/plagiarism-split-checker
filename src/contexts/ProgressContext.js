import React, { createContext, useContext, useState } from 'react';

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
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('plagiarismProgress');
    return saved ? JSON.parse(saved) : null;
  });

  const saveProgress = (data) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('plagiarismProgress', JSON.stringify(data));
    }
    setSavedProgress(data);
  };

  const clearProgress = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('plagiarismProgress');
    }
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
