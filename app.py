import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
try:
    model = pickle.load(open('best_model.pkl', 'rb'))
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features from request
        src_ip = int(data['src_ip'])
        dst_ip = int(data['dst_ip'])
        protocol = int(data['protocol'])
        service = int(data['service'])
        flag = int(data['flag'])
        src_bytes = int(data['src_bytes'])
        dst_bytes = int(data['dst_bytes'])
        
        # Create feature array
        features = np.array([[src_ip, dst_ip, protocol, service, flag, src_bytes, dst_bytes]])
        
        # Make prediction
        prediction = model.predict(features)[0]
        
        # Map prediction code to attack type name
        attack_types = {
            0: "Normal",
            1: "DoS",
            2: "Probe",
            3: "R2L",
            4: "U2R",
            5: "DDoS",
            6: "Botnet"
        }
        
        attack_type = attack_types.get(prediction, f"Unknown ({prediction})")
        
        # Create response
        response = {
            "prediction": int(prediction),
            "attack_type": attack_type,
            "success": True
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)