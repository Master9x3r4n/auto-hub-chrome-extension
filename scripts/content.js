//website itself

// Check if autologin is on
let auto_login = false;
chrome.storage.local.get(['autologEnabled'], (res) => {
    auto_login = res.autologEnabled;
});

// Check if redirect option is on
chrome.storage.local.get(['redirectEnabled'], (res) => {
    if (res.redirectEnabled === true && window.location.href === "https://archershub.dlsu.edu.ph/StudentDashboard") {
        setTimeout(() => {
            window.location.href = "https://archershub.dlsu.edu.ph/Enlistment/Index/2";
        }, 1250);
    }
});

// Check if extension is enabled
chrome.storage.local.get(['extensionEnabled'], (res) => {
    if (res.extensionEnabled === true) // something something type checking
    {
        triggerExtension();
    }
});


// HELPER FUNCTIONS
const triggerExtension = () => {
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
}

const processImage = (img) => {
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
                console.log(`Generated text: ${response.text.replace(/ /g, "")}`);
                const textOutput = document.getElementById("txtCaptchaTextLogin");
                if (textOutput) textOutput.value = response.text.replace(/[^a-zA-Z0-9]/g, "");

                // Auto sign in
                if (auto_login) {
                    document.querySelector("#btnSignIn").click();
                }
            }
        }
    );
}