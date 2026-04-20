//linked to popup.html

// Toggle for enabling extension
const toggleEnable = document.getElementById('toggle-enable');
chrome.storage.local.get(['extensionEnabled'], (res) => {
    if (chrome.runtime.lastError) {
        console.error("Storage read error:", chrome.runtime.lastError);
        return;
    }

    if (res.extensionEnabled === undefined) {
        chrome.storage.local.set({ extensionEnabled: true });
        toggleEnable.checked = true;
    } else {
        toggleEnable.checked = res.extensionEnabled;
    }
});

toggleEnable.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    chrome.storage.local.set({ extensionEnabled: isChecked }, () => {
        if (chrome.runtime.lastError) {
            console.error("Storage write error:", chrome.runtime.lastError);
            return;
        }
        console.log("Extension state saved as:", isChecked);

        // refresh page
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (isChecked && tabs[0].url === "https://archershub.dlsu.edu.ph/") {
                chrome.tabs.reload(tabs[0].id);
            }
        });
    });
});

// Toggle for enabling redirect
const toggleRedirect = document.getElementById('toggle-redirect');
chrome.storage.local.get(['redirectEnabled'], (res) => {
    if (chrome.runtime.lastError) {
        console.error("Storage read error:", chrome.runtime.lastError);
        return;
    }

    if (res.redirectEnabled === undefined) {
        chrome.storage.local.set({ redirectEnabled: false });
        toggleRedirect.checked = false;
    } else {
        toggleRedirect.checked = res.redirectEnabled;
    }
});

toggleRedirect.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    chrome.storage.local.set({ redirectEnabled: isChecked }, () => {
        if (chrome.runtime.lastError) {
            console.error("Storage write error:", chrome.runtime.lastError);
            return;
        }
        console.log("Redirect state saved as:", isChecked);
    })
});