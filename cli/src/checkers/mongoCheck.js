const spawn = require("child_process")

const mongoCheckInstall = () => {

  const spawned = spawn.spawnSync;

  const checkerResult = spawned('which', ['mongo']);
  
  if (checkerResult.stderr && checkerResult.stderr.toString().length > 0) {
    return false
  }

  return true
}

const mongoCheckDB = () => {

  const spawned = spawn.spawnSync;
  const cmd = `db.adminCommand('listDatabases')`
  const checkerResult = spawned('mongo', ["--quiet", "--eval", cmd]);

  if (checkerResult.stderr && checkerResult.stderr.toString().length > 0) {
    return false
  }

  const dbs = checkerResult.stdout.toString()
  const dbsJson = JSON.parse(dbs)

  return !!dbsJson.databases.find(db => db.name === 'shapes-trading')
}

const mongoCheckRunning = () => {

  const spawned = spawn.spawnSync;
  const checkerResult = spawned('pgrep', ["mongod"]);

  if (checkerResult.stdout && checkerResult.stdout.toString().length > 0) {
    return true
  }

 return false
}

module.exports = { mongoCheckInstall, mongoCheckDB, mongoCheckRunning }