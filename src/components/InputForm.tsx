import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    src_ip: '',
    dst_ip: '',
    protocol: '',
    service: '',
    flag: '',
    src_bytes: '',
    dst_bytes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-blue-400">Network Traffic Parameters</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Source IP */}
          <div className="space-y-2">
            <label htmlFor="src_ip" className="block text-sm font-medium text-gray-300">
              Source IP
            </label>
            <input
              type="number"
              id="src_ip"
              name="src_ip"
              value={formData.src_ip}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Encoded Source IP (0-255)"
            />
            <p className="text-xs text-gray-500">Enter encoded IP value (0-255)</p>
          </div>

          {/* Destination IP */}
          <div className="space-y-2">
            <label htmlFor="dst_ip" className="block text-sm font-medium text-gray-300">
              Destination IP
            </label>
            <input
              type="number"
              id="dst_ip"
              name="dst_ip"
              value={formData.dst_ip}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Encoded Destination IP (0-255)"
            />
            <p className="text-xs text-gray-500">Enter encoded IP value (0-255)</p>
          </div>

          {/* Protocol */}
          <div className="space-y-2">
            <label htmlFor="protocol" className="block text-sm font-medium text-gray-300">
              Protocol
            </label>
            <select
              id="protocol"
              name="protocol"
              value={formData.protocol}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Protocol</option>
              <option value="0">TCP (0)</option>
              <option value="1">UDP (1)</option>
              <option value="2">ICMP (2)</option>
              <option value="3">Other (3)</option>
            </select>
          </div>

          {/* Service */}
          <div className="space-y-2">
            <label htmlFor="service" className="block text-sm font-medium text-gray-300">
              Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Service</option>
              <option value="0">HTTP (0)</option>
              <option value="1">FTP (1)</option>
              <option value="2">SMTP (2)</option>
              <option value="3">SSH (3)</option>
              <option value="4">DNS (4)</option>
              <option value="5">Other (5)</option>
            </select>
          </div>

          {/* Flag */}
          <div className="space-y-2">
            <label htmlFor="flag" className="block text-sm font-medium text-gray-300">
              Flag
            </label>
            <select
              id="flag"
              name="flag"
              value={formData.flag}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Flag</option>
              <option value="0">S0 (0)</option>
              <option value="1">SF (1)</option>
              <option value="2">REJ (2)</option>
              <option value="3">RSTO (3)</option>
              <option value="4">RSTR (4)</option>
              <option value="5">SH (5)</option>
              <option value="6">OTH (6)</option>
            </select>
          </div>

          {/* Source Bytes */}
          <div className="space-y-2">
            <label htmlFor="src_bytes" className="block text-sm font-medium text-gray-300">
              Source Bytes
            </label>
            <input
              type="number"
              id="src_bytes"
              name="src_bytes"
              value={formData.src_bytes}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Source bytes"
            />
          </div>

          {/* Destination Bytes */}
          <div className="space-y-2">
            <label htmlFor="dst_bytes" className="block text-sm font-medium text-gray-300">
              Destination Bytes
            </label>
            <input
              type="number"
              id="dst_bytes"
              name="dst_bytes"
              value={formData.dst_bytes}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Destination bytes"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-3 text-white font-medium rounded-md transition-colors ${
            isLoading 
              ? 'bg-blue-700 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Traffic'}
        </button>
      </form>

      <div className="mt-6 text-gray-400 text-sm">
        <p>Enter network traffic parameters to detect potential cyber threats.</p>
        <p className="mt-2">The model will analyze the traffic and classify it as normal or as a specific attack type.</p>
      </div>
    </div>
  );
};

export default InputForm;