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

function init() {
  DOMAINS.forEach(addr => {
    $("#domains-menu").append(
      `<a class="dropdown-item" onclick="chooseDomain('${addr}')">${addr}</a>`
    );
  });
  $("#input-result").click(() => {
    $("#input-result").select();
  });
}

$(document).ready(() => {
  init();
});
