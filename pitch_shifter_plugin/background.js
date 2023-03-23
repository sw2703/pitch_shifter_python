chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: 'Call Python Function',
    contexts: ['link'],
    id: 'callPythonFunction'
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'callPythonFunction') {
    const linkUrl = info.linkUrl;
    const response = await fetch('http://127.0.0.1:5000/run_python_function', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input_value: linkUrl })
    });

    const data = await response.json();
    console.log('Python function result:', data.result);
  }
});
