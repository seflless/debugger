var spawn = require('child_process').spawn,
    path = require('path'),
    fs = require('fs'),
    electronPath = require('electron-prebuilt'),
    killProcess = require('../src/kill-process'),
    nodeInspector,
    node;

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

// Kill previous instance of node-inspector
killProcess("node-inspector", function(err) {
    if(err){
        console.log(err);
        return;
    }

    // Start node inspector first
    nodeInspector = spawn('node', [path.resolve(__dirname, '../node_modules/node-inspector/bin/inspector.js')], { stdio: 'inherit' });

    // Launch node in debug mode
    node = spawn('node', ['--debug-brk'].concat(process.argv.slice(2)), { stdio: 'inherit' });

    // If the node process finished then cleanup
    node.on('exit',function(){
        cleanup('node exit');
    })

    node.on('SIGHUP', function() {
        cleanup('node SIGHUP');
    });

    // Kill existing electron instances that were fired off with our script
    killProcess("debugger-app", function(err) {
        if(err){
            console.log(err);
            return;
        }

        setTimeout(function(){
            var  debugAppPath = path.resolve(
                    __dirname,
                    '../src/debugger-app.js');

            //console.log(json[0].devtoolsFrontendUrl);
            var launchDebuggerWindowCommand = electronPath + " " + debugAppPath + " http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858 &";
            //console.log(launchDebuggerWindowCommand);
            var electron = spawn('sh', ['-c', launchDebuggerWindowCommand]);

            // Shutdown if the debugger app is closed
            electron.on('exit', function(){
                cleanup('electron exit');
            });

            electron.unref();
        }, 1000);
    });
});

/*
 * Conditions for killing the debugger
 */
    // User Control+Cs or equivalent
process.on('SIGHUP', function() {
    cleanup('main SIGHUP');
});

function saveReason(str){
    fs.writeFileSync('reason.txt', str || "no reason given", "utf8");
}
    // Function that does the work of cleaning up all of the processes the debugger
    // spawned
function cleanup(reason){
    //saveReason(reason);
    if(nodeInspector){
        //nodeInspector.kill("SIGHUP");
        nodeInspector = null;
    }

    if(node){
        //node.kill("SIGHUP");
        node = null;
    }

    // Make sure the debugger process exits
    process.exit();
}
    // The process exited for whatever reason
process.on('exit', function() {
    cleanup('main process.exit');
});
/*

*/
/*
ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});
node_modules/bin/node-debug.js
node_modules/bin/node-inspector.js
*/
