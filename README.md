# grunt-git-clean

> clear out any unwanted changes since your last commit.

## Setup

```shell
npm install grunt-git-clean --save-dev
```

Once the plugin has been installed, enable inside your Gruntfile with:

```js
grunt.loadNpmTasks('grunt-git-clean');
```

## Overview
In your project's Gruntfile, add a section named `git_clean` to the data object passed into `grunt.initConfig()`. grunt git clean doesn't require any additional options to be passed into it's configuration.

```js
grunt.initConfig({
  git_clean: {},
})
```

### What happens?
The git clean task will first perform a dry run of git clean, showing you what files would be removed from your working directory. (For more information about the underlying git clean command, click [here](http://git-scm.com/docs/git-clean))

    $ grunt git_clean

    Running "git_clean" task
    Would remove lib
    Would remove test_script.js

    Proceed with removing the above files? (y/n)

You will then be prompted to either perform the proposed clean, or abort.

Aborting:

    Proceed with removing the above files? (y/n) n
    Files will be kept in working directory.

    Done, without errors.

Continue:

    Proceed with removing the above files? (y/n) y
    Removing lib
    Removing test_script.js

    Done, without errors.


