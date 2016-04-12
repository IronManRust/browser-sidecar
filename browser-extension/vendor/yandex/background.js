chrome.browserAction.onClicked.addListener(function (tab) {
    if (tab.url.lastIndexOf("chrome://", 0) !== 0 &&
        tab.url.lastIndexOf("browser://", 0) !== 0) {
        chrome.tabs.executeScript(tab.id, { "code": "overlayToggle()" });
    }
});