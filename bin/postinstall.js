#!/usr/bin/env node
var exec = require('child_process').exec,
    path = require('path'),
    fs = require('fs');

exec("cp resources/osx-app-icon.icns node_modules/electron-prebuilt/dist/Electron.app/Contents/Resources/atom.icns", function(err){
    if(err){
        console.log("Error trying to copy the OSX app icon to customize electron-prebuilt");
        process.exit(1);
    }

    var infoPListPath = path.resolve(__dirname, "../node_modules/electron-prebuilt/dist/Electron.app/Contents/Info.plist");

    var infoPListContent = fs.readFileSync(infoPListPath,'utf8');
    infoPListContent = infoPListContent.replace(/<string>Electron<\/string>/g,"<string>Debugger</string>")

    fs.writeFileSync(infoPListPath, infoPListContent);
});
