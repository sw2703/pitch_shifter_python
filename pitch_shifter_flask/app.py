from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from change_pitch_from_url import change_pitch_from_url

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes in your Flask app

@app.route('/run_python_function', methods=['POST'])
def run_python_function():
    data = request.json
    input_value = data.get('input_value', '')
    output_file = 'hello_world.mp3'
    change_pitch_from_url(input_value, output_file, -2)
    return send_file(output_file, mimetype='audio/mpeg', as_attachment=True, download_name=output_file)

if __name__ == '__main__':
    app.run(debug=True)
