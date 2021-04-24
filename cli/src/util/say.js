class SayColors {
  static DANGER = "\x1b[31m";
  static SUCCESS = "\x1b[32m";
  static WARNING = "\x1b[33m";
}

const sayYes = (msg) => {
  console.log(SayColors.SUCCESS, msg);
}

const sayNo = (msg) => {
  console.log(SayColors.DANGER, msg);
}

const sayMaybe = (msg) => {
  console.log(SayColors.WARNING, msg);
}

module.exports = {
  sayMaybe,
  sayNo,
  sayYes
}