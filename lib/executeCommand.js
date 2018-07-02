 /**
 * A module to execute node commands
 * 
 * @module executeCommands
 * @version 0.2.0
 * 
 * @return {Promise<Object>} - isError, message
 */

 'use strict';

const {exec} = require('child_process');

module.exports = (execCommand) => {
  return new Promise( (resolve) => {
    exec(execCommand, (error, stdout,) => {
      if (error) {
        resolve({error, stdout});
      } else {
        resolve({error, stdout});
      }
    });
  });
};

