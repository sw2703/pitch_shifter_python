chrome.runtime.onInstalled.addListener(() => {
  // Option to play at -2 semitones
  chrome.contextMenus.create({
    title: 'Play at -2 Semitones',
    contexts: ['link'],
    id: 'callPythonFunction'
  });

  // Option to play at -4 semitones
  chrome.contextMenus.create({
    title: 'Play at -4 Semitones',
    contexts: ['link'],
    id: 'callPythonFunctionMinus4'
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
      body: JSON.stringify({ input_value: linkUrl, semitones: -2 })
    });

    const data = await response.json();
    const audioBlob = base64ToBlob(data.mp3_base64, 'audio/mpeg');

    // Play the audio
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioPlayerHtml = `
      <html>
        <body>
          <audio controls autoplay>
            <source src="${audioUrl}" type="audio/mpeg">
          </audio>
        </body>
      </html>
    `;
    const audioPlayerUrl = 'data:text/html,' + encodeURIComponent(audioPlayerHtml);
    chrome.tabs.create({ url: audioPlayerUrl });
   

    // Download the MP3 file
    const downloadUrl = URL.createObjectURL(audioBlob);
    chrome.downloads.download({
      url: downloadUrl,
      filename: data.download_name
    });
  }
  if (info.menuItemId === 'callPythonFunctionMinus4') {
    const linkUrl = info.linkUrl;
    const response = await fetch('http://127.0.0.1:5000/run_python_function', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input_value: linkUrl })
    });

    const data = await response.json();
    const audioBlob = base64ToBlob(data.mp3_base64, 'audio/mpeg');

    // Play the audio
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioPlayerHtml = `
      <html>
        <body>
          <audio controls autoplay>
            <source src="${audioUrl}" type="audio/mpeg">
          </audio>
        </body>
      </html>
    `;
    const audioPlayerUrl = 'data:text/html,' + encodeURIComponent(audioPlayerHtml);
    chrome.tabs.create({ url: audioPlayerUrl });
   

    // Download the MP3 file
    const downloadUrl = URL.createObjectURL(audioBlob);
    chrome.downloads.download({
      url: downloadUrl,
      filename: data.download_name
    });
  }  
});

function base64ToBlob(base64, mimeType) {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
}
