/*
import React, { createContext, useContext, useState } from 'react';

interface PredictionContextType {
  prediction: string;
  setPrediction: (prediction: string) => void;
}

export const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export const usePrediction = () => {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error('usePrediction must be used within a PredictionContextProvider');
  }
  return context;
};

interface PredictionContextProviderProps {
  children: React.ReactNode;
}

export const PredictionContextProvider: React.FC<PredictionContextProviderProps> = ({ children }) => {
  const [prediction, setPrediction] = useState<string>('');

  return (
    <PredictionContext.Provider value={{ prediction, setPrediction }}>
      {children}
    </PredictionContext.Provider>
  );
};
*/


import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

interface PredictionContextType {
  prediction: string;
  predictionResults: any[];
  setPrediction: (prediction: string) => void;
  setPredictionResults: (results: any[]) => void;
  fetchPredictionResults: (imageId: string) => Promise<void>;
}

export const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export const usePrediction = () => {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error('usePrediction must be used within a PredictionContextProvider');
  }
  return context;
};

interface PredictionContextProviderProps {
  children: React.ReactNode;
}

export const PredictionContextProvider: React.FC<PredictionContextProviderProps> = ({ children }) => {
  const [prediction, setPrediction] = useState<string>('');
  const [predictionResults, setPredictionResults] = useState<any[]>([]);

  const fetchPredictionResults = useCallback(async (imageId: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/predictions/image/${imageId}`);
      setPredictionResults(response.data);
    } catch (error) {
      console.error('Error fetching prediction results:', error);
      setPredictionResults([]);
    }
  }, []);

  return (
    <PredictionContext.Provider value={{ prediction, predictionResults, setPrediction, setPredictionResults, fetchPredictionResults }}>
      {children}
    </PredictionContext.Provider>
  );
};

