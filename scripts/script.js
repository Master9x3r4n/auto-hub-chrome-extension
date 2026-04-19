//linked to popup.html

const toggleSwitch = document.getElementById('toggle-switch');
chrome.storage.local.get(['extensionEnabled'], (result) => {
    if (chrome.runtime.lastError) {
        console.error("Storage read error:", chrome.runtime.lastError);
        return;
    }

    if (result.extensionEnabled === undefined) {
        chrome.storage.local.set({ extensionEnabled: true });
        toggleSwitch.checked = true;
    } else {
        toggleSwitch.checked = result.extensionEnabled;
    }
});

toggleSwitch.addEventListener('change', (event) => {
    const isChecked = event.target.checked;
    chrome.storage.local.set({ extensionEnabled: isChecked }, () => {
        if (chrome.runtime.lastError) {
            console.error("Storage write error:", chrome.runtime.lastError);
            return;
        }
        console.log("Extension state saved as:", isChecked);

        // refresh page
        if (isChecked) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.reload(tabs[0].id);
            });
        }
    });
});