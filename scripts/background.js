// background.js

//This shit is the ocr, thank you gemini
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "do_ocr_base64") {
    
    fetch(request.image)
      .then(res => res.blob())
      .then(blob => {
        const formData = new FormData();
        
        // THIS IS THE LINE THAT FIXES THE FILE TYPE ERROR
        formData.append("file", blob, "image.png"); 
        formData.append("apikey", "helloworld");
        
        return fetch("https://api.ocr.space/parse/image", {
            method: 'POST',
            body: formData
        });
      })
      .then(response => response.json())
      .then(data => {
        if (data.IsErroredOnProcessing) {
          sendResponse({ error: data.ErrorMessage[0] });
        } else {
          sendResponse({ text: data.ParsedResults[0].ParsedText });
        }
      })
      .catch(error => sendResponse({ error: "Network failure." }));

    return true; 
  }
});