/*
 * grunt-git-clean
 * https://github.com/wampum/grunt-git-clean
 *
 * Copyright (c) 2013 Rob Culliton
 * Licensed under the MIT license.
 */


var exec = require('child_process').exec,
  util = require('util'),
  readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


'use strict';

module.exports = function(grunt) {

  grunt.registerTask('git_clean', 'git clean directories of your choice', function() {
    var done = this.async();
    exec('git status', function(error, stdout, stderr) {
      if (error && error.code === 128) {
        grunt.fail.fatal(stderr);
        done();
      } else {
        exec('git clean -n', function(error, stdout, stderr) {
          grunt.log.writeln(stdout);
          if (!stdout) {
            grunt.log.writeln('Git found no files to remove');
            done();
          } else {
            rl.question("Proceed with removing the above files? (y/n)", function(answer) {
              if (answer === "y") {
                exec('git clean -f', function(error, stdout, stderr) {
                  grunt.log.writeln(stdout);
                  rl.close();
                  done();
                });
              } else {
                grunt.log.writeln("Files will be kept in working directory.");
                rl.close();
                done();
              }
            });
          }
        });
      }
    });
  });
};