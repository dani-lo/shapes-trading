const startApp = require("./cli/src/runners/starter")
const stopApp = require("./cli/src/runners/stopper")

const say = require("./cli/src/util/say")

const cmd = process.argv[process.argv.length - 1]

const pathApp =  __dirname

if (cmd == 'start') {
  startApp(pathApp);
} else if (cmd == 'stop') {
  stopApp();
} else {
  say.sayNo('Please invoke this script with either a "start" o "stop" argument"');
}