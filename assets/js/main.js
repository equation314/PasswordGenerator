const DOMAINS = ["tsinghua.edu.cn", "net9.org", "github.com", "Google", "Apple ID"];

function genPassword() {
  let domain = $("#input-domain").val().toLowerCase();
  let rawPassword = $("#input-password").val();
  if (!domain || !rawPassword) {
    return;
  }

  let version = $("#btn-version").text();

  let length = parseInt($("#input-length").val());
  if (isNaN(length)) {
    length = 16;
  } else if (length < 8) {
    length = 8;
  } else if (length > 32) {
    length = 32;
  }
  $("#input-length").val(length);

  let password = "";
  if (version == "V1") {
    password = genPasswordV1(domain, rawPassword, length);
  } else if (version == "V2") {
    password = genPasswordV2(domain, rawPassword, length);
  }

  $("#input-result").val(password);
  showPassword("#btn-eye-result");
  setTimeout(() => hidePassword("#btn-eye-result"), 500);
  $("#btn-copy").click();
}

function chooseDomain(domain) {
  $("#input-domain").val(domain);
}

function showPassword(eye) {
  $($(eye).attr("data-password-target")).attr("type", "text");
  $(eye)
    .children(".fa")
    .removeClass("fa-eye");
  $(eye)
    .children(".fa")
    .addClass("fa-eye-slash");
}

function hidePassword(eye) {
  $($(eye).attr("data-password-target")).attr("type", "password");
  $(eye)
    .children(".fa")
    .removeClass("fa-eye-slash");
  $(eye)
    .children(".fa")
    .addClass("fa-eye");
}

function setTooltip(btn, message) {
  $(btn)
    .attr("data-original-title", message)
    .tooltip("show");
}

function hideTooltip(btn) {
  setTimeout(function () {
    $(btn)
      .tooltip("hide")
      .attr("data-original-title", "");
  }, 1000);
}

function init() {
  DOMAINS.forEach((addr, i) => {
    let btn = $(`<a class="dropdown-item" id="btn-domain-${i}">${addr}</a>`);
    $("#domains-menu").append(btn);
    btn.click(() => {
      chooseDomain(addr);
    });
  });
  $("#input-result").click(() => {
    $("#input-result").select();
  });

  $("#version-menu").children("a").each(function () {
    $(this).click(() => {
      $("#btn-version").text($(this).text());
    })
  });

  var clipboard = new ClipboardJS("#btn-copy", {
    text: trigger => $("#input-result").val()
  });
  clipboard.on("success", function (e) {
    setTooltip(e.trigger, "Copied!");
    hideTooltip(e.trigger);
  });
  clipboard.on("error", function (e) {
    setTooltip(e.trigger, "Failed!");
    hideTooltip(e.trigger);
  });

  $("#btn-copy").tooltip({
    trigger: "click"
  });
  $(".btn-eye").click(e => {
    eye = e.currentTarget;
    if (
      $(eye)
        .children(".fa")
        .hasClass("fa-eye")
    ) {
      showPassword(eye);
    } else {
      hidePassword(eye);
    }
  });

  $("#btn-gen").click(genPassword);
  $("form").submit(() => false);
}

$(document).ready(() => {
  init();
});
