DOMAINS = ["tsinghua.edu.cn", "github.com", "gmail.com", "Apple ID"];

function genPassword() {}

function chooseDomain(domain) {
  $("#input-domain").val(domain);
}

function togglePassword() {
  console.log($("#input-result").attr("type"));
  if ($("#input-result").attr("type") === "password") {
    $("#input-result").attr("type", "text");
    $("#btn-display-password i").removeClass("fa-eye");
    $("#btn-display-password i").addClass("fa-eye-slash");
  } else {
    $("#input-result").attr("type", "password");
    $("#btn-display-password i").removeClass("fa-eye-slash");
    $("#btn-display-password i").addClass("fa-eye");
  }
}

function copyToClipboard() {
  console.log(window.clipboardData);
  password = $("#input-result").val();
  console.log(password);
  window.clipboardData.setData("Text", password);
}

function setTooltip(btn, message) {
  $(btn)
    .attr("data-original-title", message)
    .tooltip("show");
}

function hideTooltip(btn) {
  setTimeout(function() {
    $(btn)
      .tooltip("hide")
      .attr("data-original-title", "");
  }, 1000);
}

function init() {
  DOMAINS.forEach(addr => {
    $("#domains-menu").append(
      `<a class="dropdown-item" onclick="chooseDomain('${addr}')">${addr}</a>`
    );
  });
  $("#input-result").click(() => {
    $("#input-result").select();
  });

  var clipboard = new ClipboardJS("#btn-copy", {
    text: trigger => $("#input-result").val()
  });
  clipboard.on("success", function(e) {
    setTooltip(e.trigger, "Copied!");
    hideTooltip(e.trigger);
  });
  clipboard.on("error", function(e) {
    setTooltip(e.trigger, "Failed!");
    hideTooltip(e.trigger);
  });

  $("#btn-copy").tooltip({
    trigger: "click"
  });
}

$(document).ready(() => {
  init();
});
