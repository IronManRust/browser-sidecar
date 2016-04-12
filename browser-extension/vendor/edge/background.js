browser.browserAction.onClicked.addListener(function (tab) {
    browser.tabs.executeScript(tab.id, { "code": "overlayToggle()" });
});