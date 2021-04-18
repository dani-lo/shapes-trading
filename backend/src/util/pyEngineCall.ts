export const pyEngineCall = (
    pyScript: string, 
    pySctriptArgs : string[], 
    onData : (dataBuffer : Buffer) => void,
    onEnd : () => void
    ) => {

    const { spawn } = require('child_process')
    const process   = spawn('python3', [pyScript, ...pySctriptArgs] )
    
    process.stdout.on('data', onData)
    process.stderr.on('data', (err : any) => console.log(err.toString()))
    process.stdout.on('end', onEnd)
}