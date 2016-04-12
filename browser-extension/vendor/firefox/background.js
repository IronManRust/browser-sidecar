chrome.browserAction.onClicked.addListener(function (tab) {
    if (tab.url.lastIndexOf("about:", 0) !== 0) {
        chrome.tabs.executeScript(tab.id, { "code": "overlayToggle()" });
    }
});