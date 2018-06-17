/**
 * @author Victor de Andrés
 * @version 1.0.0
 * @file executeCommand.js
 *
 * @async @module generic
 * @return { error, stdout }
 * @description Execute node commands
 */

 'use strict';

const {exec} = require('child_process');

module.exports = (execCommand) => {
  return new Promise( (resolve) => {
    exec(execCommand, (error, stdout, stderr) => {
      if (error) {
        resolve({error, stdout});
      } else {
        resolve({error, stdout});
      }
    });
  });
};

