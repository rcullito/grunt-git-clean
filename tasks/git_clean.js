/*
 * grunt-git-clean
 * https://github.com/wampum/grunt-git-clean
 *
 * Copyright (c) 2013 Rob Culliton
 * Licensed under the MIT license.
 */


 var exec = require('child_process').exec;
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});




'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('git_clean', 'git clean directories of your choice', function() {

    console.log(this.options());


    var done = this.async();
    exec('git clean -n', function(error, stdout, stderr) {
      console.log(stdout);

      rl.question("Proceed with removing the above files?", function(answer) {
        // condiational force or abor to done
        console.log("Ok then we will just: ....", answer);
        rl.close();
        done();
      });

    });

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
