; (function (window) {
    var app = window.app = window.app || {};

    // Browser-Specific Implementations

    app.browser = {
        name: "edge"
    };

    app.assets = {
        windowGrip: browser.extension.getURL("img/grip.png"),
        highlighterCursor: browser.extension.getURL("img/highlighter.png"),
        overlay: browser.extension.getURL("html/overlay.html"),
        overlayOrigin: browser.extension.getURL("html/overlay.html")
    };

    // Browser-Unique Functionality

    /* None */

})(window);