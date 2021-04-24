const childProcSync = require('child_process').execSync;

const say = require("../util/say");

const stopApp = async () => {
  childProcSync('pm2 stop st-frontend');
  childProcSync('pm2 stop st-backend', { stdio: "inherit"});

  say.sayYes('app stopped');
}

module.exports = stopApp;