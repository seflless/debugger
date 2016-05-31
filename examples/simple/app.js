var api = require('./dependency');

setInterval(function(){
    api.say('hello');
}, 1000);
