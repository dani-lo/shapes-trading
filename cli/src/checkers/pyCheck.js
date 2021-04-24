const spawn = require("child_process")

const pyCheck = () => {

    const spawned = spawn.spawnSync;

    const libCheckScript = `${ __dirname }/pyCheck.py`
    const checkerResult = spawned('python', [libCheckScript]);

    return checkerResult
  
}

module.exports = pyCheck