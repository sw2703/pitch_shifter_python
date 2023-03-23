from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes in your Flask app

@app.route('/run_python_function', methods=['POST'])
def run_python_function():
    data = request.json
    input_value = data.get('input_value', '')
    result = your_python_function(input_value)
    return jsonify(result=result)

def your_python_function(input_value):
    with open(r'C:\Users\sw270\Downloads\hello_world.txt', 'w') as file:
        file.write(input_value)

if __name__ == '__main__':
    app.run(debug=True)
