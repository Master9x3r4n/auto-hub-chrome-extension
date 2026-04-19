# 🏹 AutoHub Chrome Extension

Autohub is a chrome browser extension that allows you to automatically fill in tedious log in and captcha data for a certain terrible college website....

**Works only for Google Chrome browsers**

## 🗿 Features
- Auto fill Student Id and Password details (both are optional fields)
- Auto-fills the captcha (with 90% accuracy)
- Option to automatically log-in:
  - Set this to **false** if you want to verify the captcha accuracy
  - Set this to **true** if you want a lazy experience. (The extension tries again if the captcha fails!)

## ⚙️ Setting Up Extension
- Clone this repository using `git clone https://github.com/Master9x3r4n/auto-hub-chrome-exetension.git`
- In the new folder, create a `config.js` file. Follow the format in the `sample-config.js`

## 🫃 Usage
- In Google Chrome, navigate to `chrome://extensions/` (or go to the menu > More Tools > Extensions).
- Enable **Developer Mode** on the top-right corner
- Click on **Load Unpacked** on the upper-left side
- Select the root folder of the cloned repository
- Once the extension is installed, activate it in the extensions icon in the chrome toolbar.
- Whenever you head to the login page for the Terrible College Website, the extension automatically fills in the fields for you.

### 🤖 Development
- Gemini helped me for the OCR part and claude helped with the enable/disable settings bruh
- Everything else done by moi
