document.getElementById('call-function').addEventListener('click', async () => {
  const input_value = document.getElementById('input-value').value;
  const response = await fetch('http://127.0.0.1:5000/run_python_function', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input_value })
  });

  const data = await response.json();
  document.getElementById('result').innerText = data.result;
});
