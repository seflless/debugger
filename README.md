### Overview

A work in progress. See [todos](https://github.com/jiborobot/debugger/blob/master/TODOS.md). Limitations:
  - Regular node.js app debugging only for now
  - OSX only for now (Pull Requests welcome)

Features:
  - One step debugging ```debugger your-script.js```
  - Save/Restores your window position

### Usage

 1. Install ```debugger```

        npm install -g debugger

 2. To debug a script

        debugger your-script.js

 3. The Debugger App should now be open with devtools ready to go. **NOTE:** Right now it will set a breakpoint on the first line, there's a todo to configure this with an command line argument

### Contributing

1. To make your global ```debugger``` command point to your local code. Run the following from the
debugger source root folder:

        ln -s -f $("pwd")/bin/debugger-bin.js /usr/local/bin/debugger


### Credits
  - Special thanks to Camilo Aguilar ([c4milo](https://github.com/c4milo)/[@c4milo](https://twitter.com/c4milo)) for releasing the ```debugger``` module name for this project's usage
  - [node-inspector](https://www.npmjs.com/package/node-inspector) for the heavy lifting in debugging
  - [electron](http://electron.atom.io/) for making desktop apps so easy to make
  - [electron-prebuilt](https://www.npmjs.com/package/electron-prebuilt) for making electron even easier to use in projects
