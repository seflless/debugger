var app = require('app');  // Module to control application life.
var Menu = require("menu");
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var path = require("path");
var fs = require("fs");
var configPath = path.join(app.getDataPath(), "debugger-config.json");


// The debug url is passed on the command line
var debugUrl = process.argv[2];

var template = [
    {
        label: 'Debugger',
        submenu: [
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function () {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'Command+R',
                click: function () {
                    if (mainWindow) {
                        mainWindow.reloadIgnoringCache();
                    }
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {label: 'Undo', accelerator: 'Command+Z', selector: 'undo:'},
            {label: 'Redo', accelerator: 'Command+Shift+Z', selector: 'redo:'},
            {type: 'separator'},
            {label: 'Cut', accelerator: 'Command+X', selector: 'cut:'},
            {label: 'Copy', accelerator: 'Command+C', selector: 'copy:'},
            {label: 'Paste', accelerator: 'Command+V', selector: 'paste:'},
            {label: 'Select All', accelerator: 'Command+A', selector: 'selectAll:'},
        ]
    }
];

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    //set the context menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    var windowBounds = restoreWindowBounds();
    // Create the browser window.
    mainWindow = new BrowserWindow(windowBounds);

    // and load the index.html of the app.
    mainWindow.loadUrl(debugUrl);

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Save the bounds of the BrowserWindow so it can be restored on the next
        // run
        saveWindowBounds(mainWindow);

        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // Ensure any time the window changes at all that we save it's bounds for
    // restoration on next start
        // Listening to every possible window event wasn't working as triggers
        // http://electron.atom.io/docs/v0.32.0/api/browser-window/#event-39-resize-39
        // So instead we just poll to see if the windows bounds have changed and save then
    var previouslySavedBounds = {
            x: mainWindow.getBounds().x,
            y: mainWindow.getBounds().y,
            width: mainWindow.getBounds().width,
            height: mainWindow.getBounds().height
        };
    setInterval( function(){
        if( previouslySavedBounds.x !== mainWindow.getBounds().x ||
            previouslySavedBounds.y !== mainWindow.getBounds().y ||
            previouslySavedBounds.width !== mainWindow.getBounds().width ||
            previouslySavedBounds.height !== mainWindow.getBounds().height){
            saveWindowBounds();

            previouslySavedBounds = {
                x: mainWindow.getBounds().x,
                y: mainWindow.getBounds().y,
                width: mainWindow.getBounds().width,
                height: mainWindow.getBounds().height
            }
        }
    }, 500);
});

function restoreWindowBounds(){
    var data;
    try {
      data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    catch(e) {
    }

    if( typeof data !== "undefined" &&
        typeof data.bounds !== "undefined" ){
        return data.bounds;
    } else {
        return {
            width: 1024,
            height: 768
        };
    }
}

function saveWindowBounds(){
    var data = {
      bounds: mainWindow.getBounds()
    };
    fs.writeFileSync(configPath, JSON.stringify(data));
}
