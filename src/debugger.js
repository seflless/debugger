var spawn = require('child_process').spawn,
    path = require('path'),
    fs = require('fs'),
    electronPath = require('electron-prebuilt');

// Validate args
if(process.argv.length<3){
    console.log("Error: Script argument is required.");
    process.exit(1);
}

// If it's just a request for the version number early out with the version number
if(process.argv.length === 3 && process.argv[2] === '-v' ){
    var version = require("../package.json").version;
    console.log(version);
    process.exit();
}

var launchDebuggerWindowCommand = electronPath + " " + path.resolve(__dirname, "main.js") + " " + process.argv[2],
    electron = spawn('sh', ['-c', launchDebuggerWindowCommand], { stdio: 'inherit' });

// Shutdown if the debugger app is closed
electron.on('exit', function(){
    cleanup();
});

/*
 * Conditions for killing the debugger
 */
    // User Control+Cs or equivalent
process.on('SIGHUP', function() {
    cleanup();
});

function saveReason(str){
    fs.writeFileSync('reason.txt', str || "no reason given", "utf8");
}

// Cleanup and then exit
function cleanup(){

    if(electron){
        electron.kill("SIGHUP");
        node = null;
    }

    // Make sure the debugger process exits
    process.exit();
}
    // The process exited for whatever reason
process.on('exit', function() {
    cleanup();
});
