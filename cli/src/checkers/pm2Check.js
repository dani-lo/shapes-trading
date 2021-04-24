const spawn = require("child_process")

const pm2Check = () => {

  const spawned = spawn.spawnSync;

  const checkerResult = spawned('pm2');

  return checkerResult
}

module.exports = pm2Check