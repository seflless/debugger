### Overview

Work in progress. We're be extracting the debugger logic we made for remote debugging our robots into a reusable module. Supported:
  - Debugging regular node.js apps.

### Usage

 1. Install debugger

        npm install -g debugger

 2. To Debug A script

        debugger your-script.js

 3. The Debugger App should now be open with devtools ready to go. **NOTE:** Right now it will set a breakpoint on the first line, there's a todo to make configure this with an command line argument

### Todo
  - [ ] Don't set a break point on startup, instead make it --debug-brk an option
  - [ ] Support debugging electron apps
  - [ ] Support remote debugging
    - [ ] Of node apps
    - [ ] Of Electron apps
  - [ ] Add cross platform shortcuts for reload and dev tools toggle as in [electron-debug](https://www.npmjs.com/package/electron-debug)
    - [ ] Make sure menu shows proper platform shortcut
  - [ ] Checkout [Chrome DevTools App](https://kenneth.io/blog/2014/12/28/taking-chrome-devtools-outside-the-browser/) to make sure I'm not reinventing the wheel.
  - [ ] Potentially add support for remote debugging over an ssh tunnel to make debugging an app on an arbitrary server easy


### Contributing

  1. To make your global ```debugger``` command point to your local code. Run the following from the
debugger source root folder:

        ln -s -f $("pwd")/bin/debugger.js /usr/local/bin/debugger
