# Threat Alert - Cyber Threat Detection System

A full-stack web application for detecting cyber threats using machine learning.

## Features

- React frontend with intuitive UI for inputting network traffic parameters
- Flask backend API that loads a pre-trained machine learning model
- Real-time prediction of cyber attack types
- Visualization of threat detection results
- Responsive design that works on all devices

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.7+)
- pip

### Installation

1. Clone the repository
2. Set up the backend:
   ```bash
   pip install -r requirements.txt
   ```
3. Place your trained model file (`best_model.pkl`) in the root directory
4. Start the backend server:
   ```bash
   python app.py
   ```
5. Install frontend dependencies:
   ```bash
   npm install
   ```
6. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage

1. Enter the network traffic parameters (src_ip, dst_ip, protocol, service, flag, src_bytes, dst_bytes)
2. Click "Analyze Traffic" to send the data to the backend
3. View the prediction results, which will show if the traffic is normal or which type of attack it might be

## Backend API

The backend exposes the following API endpoint:

- `POST /predict`: Accepts network traffic parameters and returns the prediction result

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Flask, NumPy, Scikit-learn
- **Machine Learning**: Pre-trained SVM model

## License

This project is licensed under the MIT License - see the LICENSE file for details.