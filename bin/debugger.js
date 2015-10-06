#!/usr/bin/env node

var spawn = require('child_process').spawn,
    path = require('path'),
    electronPath = require('electron-prebuilt'),
    killProcess = require('../src/kill-process'),
    nodeInspector,
    node;

// Validate args
if(process.argv.length<3){
    console.log("Error: Script argument is required.");
    process.exit(1);
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

            electron.unref();
        }, 1000);
    });
});

/*
 * Conditions for killing the debugger
 */
    // User Control+Cs or equivalent
process.on('SIGHUP', function() {
    var fs = require('fs');
    fs.writeFileSync('test.txt', "hi","utf8");
    cleanup();
});
    // Function that does the work of cleaning up all of the processes the debugger
    // spawned
function cleanup(){
    if(nodeInspector){
        nodeInspector.kill(0);
        nodeInspector = null;
    }
    /*if(node){
        node.kill(0);
        node = null;
    }*/
    // Make sure the debugger process exits
    process.exit();
}
    // The process exited for whatever reason
process.on('exit', function() {
    console.log('process.exit');
    cleanup();
});
/*
    // If the node process finished then cleanup
node.on('exit',function(){
    console.log('node.exit');
    cleanup();
})

node.on('SIGHUP', function() {
    console.log('node.sighup');
    cleanup();
});
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
