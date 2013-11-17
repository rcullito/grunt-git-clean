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

  grunt.registerMultiTask('git_clean', 'git clean directories of your choice', function() {

    var done = this.async();
    exec('git clean -n', function(error, stdout, stderr) {
      console.log(stdout);

      rl.question("Proceed with removing the above files? (y/n)", function(answer) {
        if (answer === "y") {
          exec('git clean -f', function(error, stdout, stderr) {
            console.log(stdout);
            rl.close();
            done();
          });
        } else {
          console.log("Files will be kept in working directory.");
          rl.close();
          done();
        }
      });
    });
  });
};
