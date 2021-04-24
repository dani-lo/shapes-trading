const pyCheck = require("../checkers/pyCheck");
const pm2Check = require("../checkers/pm2Check");

const say = require("../util/say");

const childProcSync = require('child_process').execSync

const startApp = async (pathApp) => {

  const pyResult = pyCheck();


  if (pyResult.stderr && pyResult.stderr.toString().length) {
      console.log(pyResult.stderr.toString())

    say.sayNo(`Python is not aware of the st_engine modules. Try running "export PYTHONPATH=${ pathApp }/st_engine"`);
    return;
  }

  say.sayYes('Checking Python: successful. You can run st_engine modeules');

  const pm2Result = pm2Check();

  if (pm2Result.error ||  (pm2Result.stderr && pm2Result.stderr.toString().length)) {
    say.sayNo('PM2 is not installed. Try running "npm install pm2 -g"');
    return 
  }

  say.sayYes('Checking PM2: successful. You can run this app');
  
  childProcSync('npm install', {cwd: `${pathApp}/frontend`, stdio: 'inherit'});
  childProcSync('npm install', {cwd: `${pathApp}/backend`, stdio: 'inherit'});

  childProcSync('pm2 start pm2.json');
  childProcSync('pm2 list', { stdio: "inherit"});

  say.sayYes('app started. Run "node index.js stop" to quit');
}

module.exports = startApp;