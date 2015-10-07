### Overview

A work in progress. See [Todos](#todos). Limitations:
  - Regular node.js app debugging only for now
  - OSX only for now (Pull Requests welcome)

### Usage

 1. Install ```debugger```

        npm install -g debugger

 2. To debug a script

        debugger your-script.js

 3. The Debugger App should now be open with devtools ready to go. **NOTE:** Right now it will set a breakpoint on the first line, there's a todo to make configure this with an command line argument

### Credits

  - Special thanks to Camilo Aguilar ([c4milo](https://github.com/c4milo)/[@c4milo](https://twitter.com/c4milo)) for releasing the ```debugger``` module name for this projects usage
  - [node-inspector](https://www.npmjs.com/package/node-inspector) for the heavy lifting in debugging
  - [electron](http://electron.atom.io/) for making desktop apps so easy to make
  - [electron-prebuilt](https://www.npmjs.com/package/electron-prebuilt) for making electron even easier to use in projects

### Todos
We're be extracting the debugger logic we made for remote debugging our robots into a reusable module.

  - Don't set a break point on startup, instead make it --debug-brk an option
  - Support debugging electron apps
  - Support remote debugging
    - Of node apps
    - Of Electron apps
  - Add Windows/Linux support
    - Add cross platform shortcuts for reload and dev tools toggle as in [electron-debug](https://www.npmjs.com/package/electron-debug)
    - Make sure menu shows proper platform shortcut
  - Checkout [Chrome DevTools App](https://kenneth.io/blog/2014/12/28/taking-chrome-devtools-outside-the-browser/) to make sure this project has a unique value proposition.
  - Potentially add support for remote debugging over an ssh tunnel to make debugging an app on an arbitrary server easy

### Contributing

1. To make your global ```debugger``` command point to your local code. Run the following from the
debugger source root folder:

        ln -s -f $("pwd")/bin/debugger.js /usr/local/bin/debugger
