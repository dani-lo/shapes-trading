class SayColors {
  static DANGER = "\x1b[31m";
  static SUCCESS = "\x1b[32m";
  static WARNING = "\x1b[33m";
}

const sayYes = (msg) => {
  console.log(SayColors.SUCCESS, `-> ${ msg }`);
}

const sayNo = (msg) => {
  console.log(SayColors.DANGER, `-> ${ msg }`);
}

const sayMaybe = (msg) => {
  console.log(SayColors.WARNING, `:: ${ msg }`);
}

class Teller {

  constructor () {
    this.msgs = []
  }

  addNo (msg) { 
    this.msgs.push(['no', msg]); 
  }
  addYes (msg) { 
    this.msgs.push(['yes', msg]); 
  }
  addMayb (msg) { 
    this.msgs.push(['mayb', msg]); 
  }

  somethingToSay() {
    return !!this.msgs.length;
  }

  anthingBadToSay () {
    return !!this.msgs.find(msg => msg[0] === 'no');
  }

  speakup () {
    this.msgs.forEach((msg) => {
      switch(msg[0]) {
        case 'no':
          sayNo(msg[1])
          break;
        case 'yes':
          sayYes(msg[1])
          break;
        case 'mayb':
          sayMaybe(msg[1])
          break;
      }
    })

    this.msg = []
  }
}

module.exports = {
  sayMaybe,
  sayNo,
  sayYes,
  Teller
}