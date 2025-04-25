import React from 'react';
import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';

interface ResultDisplayProps {
  result: {
    prediction: number;
    attack_type: string;
    loading: boolean;
    error: string | null;
  };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const getThreatColor = () => {
    if (result.prediction === -1) return 'bg-gray-700';
    if (result.attack_type === 'Normal') return 'bg-green-600';
    if (['DoS', 'DDoS'].includes(result.attack_type)) return 'bg-red-600';
    return 'bg-yellow-600';
  };

  const getThreatIcon = () => {
    if (result.prediction === -1) return <AlertCircle className="w-12 h-12 text-gray-400" />;
    if (result.attack_type === 'Normal') return <Shield className="w-12 h-12 text-green-400" />;
    if (['DoS', 'DDoS'].includes(result.attack_type)) return <AlertTriangle className="w-12 h-12 text-red-400" />;
    return <AlertCircle className="w-12 h-12 text-yellow-400" />;
  };

  const getThreatDescription = () => {
    if (result.prediction === -1) return 'Enter network parameters and click "Analyze Traffic" to begin threat detection.';
    
    const descriptions: {[key: string]: string} = {
      'Normal': 'The traffic appears to be normal with no detected threats.',
      'DoS': 'Denial of Service attack detected. This type of attack attempts to make a network resource unavailable.',
      'DDoS': 'Distributed Denial of Service attack detected. This attack is launched from multiple sources.',
      'Probe': 'Scanning or probing attack detected. This is typically used to gather information about the network.',
      'R2L': 'Remote to Local attack detected. This involves unauthorized access from a remote machine.',
      'U2R': 'User to Root attack detected. This involves unauthorized access to root privileges.',
      'Botnet': 'Botnet activity detected. This indicates a network of compromised machines.',
      'Unknown': 'Unknown attack pattern detected. Further investigation is recommended.'
    };
    
    return descriptions[result.attack_type] || 'Suspicious traffic detected. Investigation recommended.';
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-full">
      <h2 className="text-xl font-semibold mb-6 text-blue-400">Analysis Results</h2>
      
      {result.error && (
        <div className="bg-red-900/30 border border-red-700 rounded-md p-4 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
            <p className="text-red-300">{result.error}</p>
          </div>
        </div>
      )}
      
      <div className={`rounded-lg p-6 mb-6 ${getThreatColor()}`}>
        <div className="flex items-center space-x-4 mb-4">
          {getThreatIcon()}
          <h3 className="text-xl font-bold">
            {result.loading ? 'Analyzing...' : (result.prediction === -1 ? 'Ready for Analysis' : result.attack_type)}
          </h3>
        </div>
        <p className="text-gray-200">
          {result.loading ? 'Processing network traffic data...' : getThreatDescription()}
        </p>
      </div>
      
      {result.prediction !== -1 && !result.loading && !result.error && (
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-md p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Threat Classification Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">Prediction Code:</div>
              <div className="text-white font-mono">{result.prediction}</div>
              <div className="text-gray-400">Attack Type:</div>
              <div className="text-white font-mono">{result.attack_type}</div>
              <div className="text-gray-400">Severity:</div>
              <div className="text-white font-mono">
                {result.attack_type === 'Normal' ? 'None' : 
                 ['DoS', 'DDoS'].includes(result.attack_type) ? 'High' : 'Medium'}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-md p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Recommended Actions</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              {result.attack_type === 'Normal' ? (
                <li>Continue monitoring network traffic</li>
              ) : (
                <>
                  <li>Investigate source IP for suspicious activity</li>
                  <li>Check firewall logs for related traffic patterns</li>
                  <li>Consider implementing additional filtering rules</li>
                  {['DoS', 'DDoS'].includes(result.attack_type) && (
                    <li>Implement rate limiting or blocking at network edge</li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;