; (function (window) {
    var app = window.app = window.app || {};

    // Browser-Specific Implementations

    app.browser = {
        name: "safari"
    };

    app.assets = {
        windowGrip: safari.extension.baseURI + "img/grip.png",
        highlighterCursor: safari.extension.baseURI + "img/highlighter.png",
        overlay: safari.extension.baseURI + "html/overlay.html",
        overlayOrigin: safari.extension.baseURI + "html/overlay.html"
    };

    // Browser-Unique Functionality

    safari.self.addEventListener("message", function (event) {
        if (event.name === "overlay-toggle") {
            overlayToggle();
        }
    }, false);

})(window);