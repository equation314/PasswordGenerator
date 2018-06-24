DOMAINS = ["tsinghua.edu.cn", "github.com", "Google", "Apple ID"];

function genPassword() {
  let domain = $("#input-domain")
    .val()
    .toLowerCase();
  let rawPassword = $("#input-password").val();
  if (!domain || !rawPassword) {
    return;
  }

  let hmac = CryptoJS.HmacSHA3(domain, rawPassword).toString(
    CryptoJS.enc.Base64
  );
  let password = hmac.replace(/=/g, "").substr(-16);

  $("#input-result").val(password);
  showPassword();
  setTimeout(hidePassword, 500);
}

function chooseDomain(domain) {
  $("#input-domain").val(domain);
}

function showPassword() {
  $("#input-result").attr("type", "text");
  $("#btn-display-password i").removeClass("fa-eye");
  $("#btn-display-password i").addClass("fa-eye-slash");
}

function hidePassword() {
  $("#input-result").attr("type", "password");
  $("#btn-display-password i").removeClass("fa-eye-slash");
  $("#btn-display-password i").addClass("fa-eye");
}

function togglePassword() {
  if ($("#input-result").attr("type") === "password") {
    showPassword();
  } else {
    hidePassword();
  }
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
