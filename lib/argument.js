/**
 * check if arguments pass has valid user
 * @param  {} objArguments={}
 * @returns bool
 */
function hasValidUser(objArguments = {}){
  if ('user' in objArguments) {
    return objArguments['user'];
  } else {
    return false;
  }
}

/**
 * check if arguments pass has valid password
 * @param  {} objArguments={}
 * @returns bool
 */
function hasValidPass(objArguments = {}){
  if ('user' in objArguments) {
    return objArguments['pass'];
  } else {
    return false;
  }
}

/**
 * check if arguments has git credentials
 * @param  {} objArguments={}
 * @returns bool
 */
function hasGitCredentials(objArguments = {}) {
  return hasValidUser(objArguments) && hasValidPass(objArguments);
}

module.exports = {
  hasGitCredentials
};
