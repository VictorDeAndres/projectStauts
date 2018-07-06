/**
 * A module that check the send arguments
 * 
 * @module arguments
 * @version 0.2.0
 * 
 * @public @method hasArguments
 * @public @method hasCredentials
 * @public @method extractRepo
 */

'use strict';

module.exports = {
  hasArguments,
  hasCredentials,
  extractRepo
};

const _ = require('lodash');

/**
 * Check if pass arguments
 *
 * @function hasValidUser
 * @param {Object} objArguments - Pass arguments
 * @return {Boolean} 
 */
function hasArguments(objArguments = {}) {
  return _.size(objArguments) === 1 ? false : true;
}

/**
 * Check if arguments pass has the parameter user
 *
 * @function hasValidUser
 * @param {Object} objArguments - Pass arguments
 * @return {Boolean} 
 */
function hasValidUser(objArguments = {}) {
  if ('user' in objArguments) {
    return objArguments['user'];
  } else {
    return false;
  }
}

/**
 * Check if arguments pass has the parameter pass or password
 *
 * @function hasValidPass
 * @param {Object} objArguments - Pass arguments
 * @return {Boolean} 
 */
function hasValidPass(objArguments = {}) {
  if ('pass' in objArguments || 'password' in objArguments) {
    return objArguments['pass'] || objArguments['password'];
  } else {
    return false;
  }
}

/**
 * Check if arguments pass has the parameter user and pass or password arguments
 *
 * @function hasValidUser
 * @param {Object} objArguments - Pass arguments
 * @return {Boolean} 
 */
function hasCredentials(objArguments = {}) {
  return hasValidUser(objArguments) && hasValidPass(objArguments);
}

/**
 * Check if the packaje json has valid type of repository
 *
 * @function extractRepo
 * @return {Boolean} 
 */
function extractRepo() {
  const currReport = global.statusProject.packageFile.repository.url.split('/');
  return currReport.some((element) => {
    return element === 'github.com'
  });
}