; (function (window) {
    var app = window.app = window.app || {};

    // Browser-Specific Implementations

    app.browser = {
        name: "firefox"
    };

    app.assets = {
        windowGrip: chrome.extension.getURL("img/grip.png"),
        highlighterCursor: chrome.extension.getURL("img/highlighter.png"),
        overlay: chrome.extension.getURL("html/overlay.html"),
        overlayOrigin: "*"
    };

    // Browser-Unique Functionality

    /* None */

})(window);