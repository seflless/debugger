

var electron = require('electron');
var Menu = electron.Menu;//require("menu");
var BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
var app = electron.app;
var path = require("path");
var fs = require("fs");



// The target script or webpage to debug is passed on the command line
var target = path.resolve(process.cwd(), process.argv[2]);
process.chdir(path.dirname(target));

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
                label: 'Reload Script',
                accelerator: 'CommandOrControl+R',
                click: function () {
                    if (mainWindow) {
                        mainWindow.reloadIgnoringCache();
                    }
                }
            },
            {type: 'separator'},
            {
                label: 'Developer Tools',
                accelerator: 'Alt+CommandOrControl+I',
                click: function () {
                    mainWindow.toggleDevTools();
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

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720
    });

    // Check the target file's extension
    var extension = path.extname(target);
        // Load a webpage if it's an .html file
    if( extension === '.html' ) {
        console.log(target);
        mainWindow.loadURL( 'file://' + target );
    }
        // Load the wrapping debugger page if it's a .js file
    else if ( extension === '.js' ) {
        console.log(target);
        mainWindow.hide();

        var debuggerWebpage = 'file://' + path.resolve(__dirname, '../debugger.html');
        mainWindow.loadURL( debuggerWebpage );

        var ipcMain = electron.ipcMain;
        ipcMain.on('get-target-script', function(event, arg) {
          event.returnValue = target;
        });
    }

    mainWindow.webContents.openDevTools();
    mainWindow.webContents.on('devtools-opened', function(){
        mainWindow.focus();
    });

    // TODO: Explore this api more
    // https://chromedevtools.github.io/debugger-protocol-viewer/1-1/Debugger/#method-setBreakpointByUrl
    // https://github.com/electron/electron/blob/702352804239f58e5abcd0b96dbd748b68ab0278/spec/api-debugger-spec.js#L77
    /*mainWindow.webContents.debugger.attach();
    mainWindow.webContents.debugger.sendCommand(
        'Debugger.setBreakpointByUrl', {
            lineNumber: 0,
            columnNumber: 0,
            url: "/Users/francoislaberge/dev/debugger/examples/simple/app.js"
        },
        function (err, result){
            console.log('hi');
            if(err){
                console.error(err);
                return;
            }
            console.log(result);
        });
    */


    // Emitted when the window is closed.
    mainWindow.on('closed', function() {

        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});
