var markup = document.createElement("div");
markup.innerHTML = "<div id='browser-sidecar-overlay'>" +
                       "<div id='browser-sidecar-overlay-handle'></div>" +
                       "<div id='browser-sidecar-overlay-busy-icon'><svg version='1.1' id='Svg2' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='40px' height='40px' viewBox='5 0 40 40' enable-background='new 0 0 40 40' xml:space='preserve'><path opacity='0.3' fill='#000' d='M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z'/><path fill='#000' d='M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z'><animateTransform attributeType='xml' attributeName='transform' type='rotate' from='0 20 20' to='360 20 20' dur='1s' repeatCount='indefinite'/></path></svg></div>" +
                       "<div id='browser-sidecar-overlay-html'></div>" +
                   "</div>" +
                   "<div id='browser-sidecar-capture-context'>Capture</div>" +
                   "<div id='browser-sidecar-highlighter-border-top'></div>" +
                   "<div id='browser-sidecar-highlighter-border-bottom'></div>" +
                   "<div id='browser-sidecar-highlighter-border-left'></div>" +
                   "<div id='browser-sidecar-highlighter-border-right'></div>";
document.body.appendChild(markup);

var overlayToggleState = false;
var overlayToggle = function () {
    if (overlayToggleState === false) {
        overlayEnable();
    } else {
        overlayDisable();
    }
}

var overlayEnable = function () {
    popupOn();
    borderModeEnabled();
    contextInitialize();
    overlayToggleState = true;
}

var overlayDisable = function () {
    popupOff();
    borderModeDisabled();
    contextUnbind();
    overlayToggleState = false;
}

var popupOn = function () {
    $("#browser-sidecar-overlay-html").html("<iframe id='browser-sidecar-iframe' src='" + app.assets.overlay + "?browser=" + app.browser.name + "&version={{version}}' />");
    $("#browser-sidecar-overlay-handle").html("<img src='" + app.assets.windowGrip + "' />");
    $("#browser-sidecar-overlay").draggable("enable").draggable({ cursor: "move", handle: "#browser-sidecar-overlay-handle", containment: "window" }).show();
    $("#browser-sidecar-iframe").load(function () {
        $("#browser-sidecar-overlay-busy-icon").remove();
    });
}

var popupOff = function () {
    $("#browser-sidecar-overlay").addClass("hiding");
    setTimeout(function () {
        $("#browser-sidecar-overlay").draggable("disable").draggable({ cursor: "auto", handle: "" }).hide().removeClass("hiding");
        $("#browser-sidecar-overlay-handle").html("");
        $("#browser-sidecar-overlay-html").html("");
    }, 600);
}

var contextInitialize = function () {
    window.addEventListener("message", listener);
}

var contextBind = function () {
    borderModeHighlight();
    var content;
    $("body").on("mouseup", function (e) {
        var range = window.getSelection().getRangeAt(0);
        if (range.collapsed === false) {
            content = range.cloneContents(),
            $("#browser-sidecar-capture-context").css({ "top": e.pageY, "left": e.pageX }).show();
        } else {
            $("#browser-sidecar-capture-context").css({ "top": 0, "left": 0 }).hide();
        };
    });
    $("#browser-sidecar-capture-context").click(function () {
        if (content) {
            var span = document.createElement("span");
            span.appendChild(content);
            document.getElementById("browser-sidecar-iframe").contentWindow.postMessage(new messagePayload("capture", { html: span.innerHTML }), app.assets.overlayOrigin);
            $("#browser-sidecar-capture-context").css({ "top": 0, "left": 0 }).hide();
        }
    });
}

var contextUnbind = function () {
    $("#browser-sidecar-capture-context").css({ "top": 0, "left": 0 }).hide();
    $("body").unbind("mouseup");
    window.removeEventListener("message", listener);
}

var listener = function (event) {
    if (event.data === "startCapture") {
        borderModeHighlight();
        contextBind();
    }
    if (event.data === "endCapture") {
        borderModeEnabled();
        contextUnbind();
        contextInitialize();
    }
}

var messagePayload = function (message, payload) {
    this.message = message;
    this.payload = payload;
}

var borderModeEnabled = function () {
    $("body").css("cursor", "auto");
    $("#browser-sidecar-highlighter-border-top").css({ "background": "#26f84d" }).show();
    $("#browser-sidecar-highlighter-border-bottom").css({ "background": "#26f84d" }).show();
    $("#browser-sidecar-highlighter-border-left").css({ "background": "#26f84d" }).show();
    $("#browser-sidecar-highlighter-border-right").css({ "background": "#26f84d" }).show();
}

var borderModeHighlight = function () {
    $("body").css("cursor", "url(" + app.assets.highlighterCursor + "), auto");
    $("#browser-sidecar-highlighter-border-top").css({ "background": "#ffff00" }).show();
    $("#browser-sidecar-highlighter-border-bottom").css({ "background": "#ffff00" }).show();
    $("#browser-sidecar-highlighter-border-left").css({ "background": "#ffff00" }).show();
    $("#browser-sidecar-highlighter-border-right").css({ "background": "#ffff00" }).show();
}

var borderModeDisabled = function () {
    $("body").css("cursor", "auto");
    $("#browser-sidecar-highlighter-border-top").css({ "background": "#ffffff" }).hide();
    $("#browser-sidecar-highlighter-border-bottom").css({ "background": "#ffffff" }).hide();
    $("#browser-sidecar-highlighter-border-left").css({ "background": "#ffffff" }).hide();
    $("#browser-sidecar-highlighter-border-right").css({ "background": "#ffffff" }).hide();
}