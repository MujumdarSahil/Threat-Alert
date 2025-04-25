import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-white">Threat Alert</h1>
          </div>
          <div className="text-gray-400 text-sm">
            Cyber Threat Detection System
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;