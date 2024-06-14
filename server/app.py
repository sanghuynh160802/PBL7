from flask import Flask, request, jsonify, send_file
from io import BytesIO
from flask_cors import CORS
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import cv2

# Define Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the new model
new_model = load_model("D://SANG//NAM 4//PBL7//PBL7_3//MedicalRecords//FE-MedicalRecords//server//model//finalmodelPBL7.h5")

# Route for predicting diabetic retinopathy
@app.route('/predict_retinopathy', methods=['POST'])
def predict_retinopathy():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    img_file = request.files['image']
    if img_file.filename == '':
        return jsonify({'error': 'No image selected'}), 400

    try:
        # Read and preprocess the image
        img = cv2.imdecode(np.frombuffer(img_file.read(), np.uint8), cv2.IMREAD_COLOR)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (224, 224))
        img = img.astype('float32') / 255.0

        # Make prediction using the new model
        prediction = new_model.predict(np.array([img]))

        # Return the prediction as a list of numerical values
        return jsonify({'prediction': prediction.tolist()}), 200
    except Exception as e:
        print("Error processing image:", e)
        return jsonify({'error': 'Error processing image'}), 500

# Route for processing image to grayscale
@app.route('/process_image', methods=['POST'])
def process_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        img_file = request.files['image']
        if img_file.filename == '':
            return jsonify({'error': 'No image selected'}), 400

        # Read the image
        img = cv2.imdecode(np.frombuffer(img_file.read(), np.uint8), cv2.IMREAD_COLOR)
        if img is None:
            return jsonify({'error': 'Failed to read image'}), 400

        # Convert to grayscale
        gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Apply Gaussian blur
        gaussian_filtered = cv2.GaussianBlur(gray_image, (5, 5), 0)

        # Resize the image to 224x224
        resized_image = cv2.resize(gaussian_filtered, (224, 224))

        # Convert the processed image to bytes
        _, buffer = cv2.imencode('.jpeg', resized_image)
        image_bytes = buffer.tobytes()

        # Send the processed image back
        return send_file(
            BytesIO(image_bytes),
            mimetype='image/jpeg'
        )
    except Exception as e:
        # Detailed error logging
        print(f"Error processing image: {e}")
        return jsonify({'error': f"Error processing image: {e}"}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5000)










