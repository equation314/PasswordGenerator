const DOMAINS = ["tsinghua.edu.cn", "net9.org", "github.com", "Google", "Apple ID"];
const UPPERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERS = UPPERS.toLowerCase();
const NUMBERS = "0123456789";
const SPECIALS = "!#$%&()*@^";
const LENGTH = 16;

class Rng {
  constructor(seed1, seed2) {
    this.seed = seed1;
    this.state = CryptoJS.HmacSHA3(seed2, seed1).toString(CryptoJS.enc.Hex);
  }

  nextWord() {
    this.state = CryptoJS.HmacSHA3(this.seed, this.state).toString(CryptoJS.enc.Hex);
    return parseInt('0x' + this.state.substr(0, 8), 16);
  };

  nextInt(start, end) {
    if (end <= start)
      return 0;
    return start + this.nextWord() % (end - start);
  };

  nextChar(charset) {
    return charset[this.nextInt(0, charset.length)];
  };

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = this.nextInt(0, i + 1);
      let tmp = array[j];
      array[j] = array[i];
      array[i] = tmp;
    }
  }
}

function genPassword(domain, rawPassword) {
  if (!domain || !rawPassword) {
    return;
  }

  let rng = new Rng(domain, rawPassword);
  let password = [];

  password.push(rng.nextChar(UPPERS));
  password.push(rng.nextChar(LOWERS));
  password.push(rng.nextChar(NUMBERS));
  password.push(rng.nextChar(SPECIALS));

  for (let i = 0; i < LENGTH - 4; i++) {
    let x = rng.nextInt(0, 10);
    if (x < 3) {
      password.push(rng.nextChar(UPPERS));
    } else if (x < 6) {
      password.push(rng.nextChar(LOWERS));
    } else if (x < 8) {
      password.push(rng.nextChar(NUMBERS));
    } else if (x < 10) {
      password.push(rng.nextChar(SPECIALS));
    }
  }

  rng.shuffle(password);

  return password.join("");
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

  $("#btn-gen").click(() => {
    let password = genPassword(
      $("#input-domain").val().toLowerCase(),
      $("#input-password").val()
    );
    $("#input-result").val(password);
    showPassword("#btn-eye-result");
    setTimeout(() => hidePassword("#btn-eye-result"), 500);
    $("#btn-copy").click();
  });
  $("form").submit(() => false);
}

$(document).ready(() => {
  init();
});
