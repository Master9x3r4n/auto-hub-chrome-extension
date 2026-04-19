//website itself

// User details
const studentId = ENV.STUDENT_ID;
const password = ENV.PASSWORD;

document.getElementById("txtuserid").value = studentId;
document.getElementById("txtpassword").value = password;

// Captcha handling
const targetImg = document.getElementById("captchaImageLogin");

if (targetImg) {
    if (targetImg.complete) {
        processImage(targetImg);
    } else {
        targetImg.onload = () => processImage(targetImg);
    }
}

function processImage(img) {
    // 1. Grab the pixels from the screen
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    
    // 2. Convert to Base64
    const base64Data = canvas.toDataURL('image/png');

    // 3. Send to background
    chrome.runtime.sendMessage(
        { action: "do_ocr_base64", image: base64Data }, 
        (response) => {  
            // Safeguard against closed port errors
            if (chrome.runtime.lastError) return console.log(chrome.runtime.lastError.message);
            if (!response) return console.log("Empty response");

            // Handle the result
            if (response.error || !response.text) {
                console.log(`OCR Failed: ${response.error || 'No text found'}`);
            } else {
                console.log(`Generated text: ${response.text}`);
                const textOutput = document.getElementById("txtCaptchaTextLogin");
                if (textOutput) textOutput.value = response.text;
            }
        }
    );
}