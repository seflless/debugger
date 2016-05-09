### Overview
Easily Debug Node and Electron renderer process scripts.

### Usage

 1. Install ```debugger```

        npm install -g debugger

 2. To debug a script

        debugger your-script.js

 3. Press Command + R (OSX) or Control + R (Windows/Linux) to reload the script.

### Contributing

1. To make your global ```debugger``` command point to your local code. Run the following from the
debugger source root folder:

        npm link .

### Credits
  - Special thanks to Camilo Aguilar ([c4milo](https://github.com/c4milo)/[@c4milo](https://twitter.com/c4milo)) for releasing the ```debugger``` module name for this project's usage
  - [electron](http://electron.atom.io/) for making desktop apps so easy to make
  - [electron-prebuilt](https://www.npmjs.com/package/electron-prebuilt) for making electron even easier to use in projects

### todos
  - Switch to using [commander](https://www.npmjs.com/package/commander) to get better command line instructions.
  - Add support for a switch to show the browserwindow for people who want to test code that requires a DOM and browser APIs.
