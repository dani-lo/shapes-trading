const pyCheck = require("../checkers/pyCheck");
const pm2Check = require("../checkers/pm2Check");
const mongoCheck = require("../checkers/mongoCheck");

const say = require("../util/say");

const childProcSync = require('child_process').execSync;

const startApp = async (pathApp) => {

  const bot = new say.Teller();
  const pyResult = pyCheck();

  if (!pyResult) {
    bot.addNo(`Python is not aware of the st_engine modules. `);
    bot.addMayb(`Try running "export PYTHONPATH=${ pathApp }/st_engine"`);
  } else {
    bot.addYes('Checking Python path: successful. You can run st_engine modeules');
  }

  const pm2Result = pm2Check();

  if (!pm2Result) {
    bot.addNo('PM2 is not installed');
    bot.addMayb('Try running "npm install pm2 -g"');
  } else {
    bot.addYes('Checking PM2: successful. You can run this app');
  }
  
  const mongoResultInstall = mongoCheck.mongoCheckInstall();

  if (!mongoResultInstall) {
    bot.addNo('Error checking Mongo database: Mongo is not installed');
    bot.addMayb('You need to have Mongo installed');
    return 
  } else {
    bot.addYes('Checking Mongo installation: successful. Mongo is installed');
  }
  
  const mongoResultRunning = mongoCheck.mongoCheckRunning();

  if (!mongoResultRunning) {
    bot.addNo('Error checking Mongo database: your local mongo is not running');
    bot.addMayb('Start your local mongo');
  } else {
    bot.addYes('Checking Mongo status: successful. Mongo is running')
  }

  // const mongoResultDb = mongoCheck.mongoCheckDB();

  // if (mongoResultRunning) {
  //   if (!mongoResultDb) {
  //     bot.addNo('Error checking Mongo database: you dont have the required database setup');
  //     bot.addMayb('Crete a new Mongo database named "shapes-trading"');
  //   } else {
  //     bot.addYes('Checking Mongo database: successful. Mongo database is ready');
  //   }
  // }
  

  if (bot.somethingToSay()) {
    const proceed = !bot.anthingBadToSay()
    bot.speakup()

    if(!proceed) {
      return
    }
  }

  say.sayMaybe('>>>>>>>>>>>>>>> Installing Frontend modules');
  childProcSync('npm install', {cwd: `${pathApp}/frontend`, stdio: 'inherit'});

  say.sayMaybe('>>>>>>>>>>>>>>> Installing Backend modules');
  childProcSync('npm install', {cwd: `${pathApp}/backend`, stdio: 'inherit'});

  childProcSync('pm2 start pm2.json');
  childProcSync('pm2 list', { stdio: "inherit"});

  say.sayYes('app started. Run "node index.js stop" to quit');
}

module.exports = startApp;