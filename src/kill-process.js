var exec = require('child_process').exec,
    _ = require("lodash");

// Find any tunnels that may have been previously created so that we can kill their processes
function killProcess(lookForString, cb){
    exec('ps -e',
    function (err, stdout) {
        if(err){
            cb(err);
            return;
        }

        // Break up the ps -e output into array containing each line,
        // and then filter that array to only include lines that have the markings
        // of the command who's process instances we're trying to kill
        var pids =   _.filter(stdout.split('\n'), function(line) {
                            return line.search(lookForString) !== -1
                        });

        // Now extract just the pids which are the first number separated by a space
        pids =  _.map(pids, function(line) {
                    return /\d{1,}/.exec(line)[0];
                })

        // Now use the pids array to call kill with all the pids as parameters
        var killCommand = 'kill ' + pids.join(' ') + ' || :';

        exec(killCommand,
            function (err, stdout) {
                if(err){
                    cb(err);
                    return;
                }
                cb();
            });
    });
}


module.exports = killProcess;
