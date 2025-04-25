import React, { useState } from 'react';
import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';
import './index.css';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [result, setResult] = useState<{
    prediction: number;
    attack_type: string;
    loading: boolean;
    error: string | null;
  }>({
    prediction: -1,
    attack_type: '',
    loading: false,
    error: null
  });

  const handleFormSubmit = async (formData: any) => {
    try {
      setResult(prev => ({ ...prev, loading: true, error: null }));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock prediction logic
      const randomPrediction = Math.floor(Math.random() * 7);
      const attackTypes = {
        0: "Normal",
        1: "DoS",
        2: "Probe",
        3: "R2L",
        4: "U2R",
        5: "DDoS",
        6: "Botnet"
      };
      
      setResult({
        prediction: randomPrediction,
        attack_type: attackTypes[randomPrediction as keyof typeof attackTypes],
        loading: false,
        error: null
      });
      
    } catch (error) {
      setResult(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'An error occurred during analysis. Please try again.' 
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputForm onSubmit={handleFormSubmit} isLoading={result.loading} />
          <ResultDisplay result={result} />
        </div>
      </main>
      <footer className="mt-8 py-6 border-t border-gray-800 text-gray-400 text-center">
        <p>&copy; 2025 Threat Alert. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;