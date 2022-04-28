const UPPERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERS = UPPERS.toLowerCase();
const NUMBERS = "0123456789";
const SPECIALS = "!#$%&()*@^";

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

function genPasswordV1(domain, rawPassword, length) {
  if (length < 4 || length > 32) return "";

  let hmac = CryptoJS.HmacSHA3(domain, rawPassword).toString(
    CryptoJS.enc.Base64
  );
  let password = hmac.replace(/=/g, "").substr(-length);
  return password;
}

function genPasswordV2(domain, rawPassword, length) {
  if (length < 4 || length > 32) return "";

  let rng = new Rng(domain, rawPassword);
  let password = [];

  password.push(rng.nextChar(UPPERS));
  password.push(rng.nextChar(LOWERS));
  password.push(rng.nextChar(NUMBERS));
  password.push(rng.nextChar(SPECIALS));

  for (let i = 0; i < length - 4; i++) {
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
