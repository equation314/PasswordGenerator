chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create("app.html", {
    innerBounds: {
      width: 400,
      height: 320,
      maxWidth: 400,
      maxHeight: 320,
      minWidth: 400,
      minHeight: 320
    }
  });
});
