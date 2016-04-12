document.getElementById("overlay-capture-start").addEventListener("click", function() {
    sendMessage("startCapture");
});

document.getElementById("overlay-capture-end").addEventListener("click", function() {
    sendMessage("endCapture");
});

document.getElementById("overlay-capture-clear").addEventListener("click", function() {
    setValue("");
});

window.addEventListener("message", function(event) {
    if (event.data.message === "capture") {
        setValue(event.data.payload.html);
    }
});

var sendMessage = function(message) {
    if (window && window.parent && window.parent.window) {
        window.parent.window.postMessage(message, "*");
    }
};

var setValue = function(value) {
    document.getElementById("overlay-capture-value").value = value;
};