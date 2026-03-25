import React, { createContext, useCallback, useContext, useState } from 'react';

const ProgressContext = createContext();

const getStorage = () => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [savedProgress, setSavedProgress] = useState(() => {
    const storage = getStorage();
    if (!storage) return null;
    const saved = storage.getItem('plagiarismProgress');
    return saved ? JSON.parse(saved) : null;
  });

  const saveProgress = useCallback((data) => {
    const storage = getStorage();
    if (storage) storage.setItem('plagiarismProgress', JSON.stringify(data));
    setSavedProgress(data);
  }, []);

  const clearProgress = useCallback(() => {
    const storage = getStorage();
    if (storage) storage.removeItem('plagiarismProgress');
    setSavedProgress(null);
  }, []);

  const loadProgress = useCallback(() => savedProgress, [savedProgress]);

  return (
    <ProgressContext.Provider value={{ saveProgress, clearProgress, loadProgress, savedProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
