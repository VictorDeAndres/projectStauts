/**
 * Module to verify the prerequisites and fix if there is an error for generate the document
 * @module prerequisites
 * @version 0.2.0
 * 
 * @public @method checkPackageJson
 * @public @method checkPackageJson
 * @public @method checkNodeVersion
 * @public @method validateImageFolder
 * @public @method createAssetsFolder* 
 */

'use strict';

module.exports = {
  checkPackageJson,
  checkNpmVersion,
  checkNodeVersion,
  validateImageFolder,
  createAssetsFolder,
};


const fs = require('fs');
const semver = require('semver');
const chalk = require('chalk');
const executeCommand = require('./executeCommand');

/**
 * Check exists package.json and package-lock.json
 *
 * @function checkPackageJson
 * @return {Boolean} 
 */
function checkPackageJson() {
  const packageFile = require('./../package.json');
  const packageLockFile = require('./../package-lock.json');
  return true;
}


/**
 * Check if the npm version installed is the correct.
 * 
 * @async
 * @function checkNpmVersion
 * @return {Promise<Boolean>}
 */
async function checkNpmVersion() {
  process.stdout.write(chalk.blue('     Check npm version: '));
  const npmVersion = await executeCommand('npm -v');
  const currentNPMVersion = semver.coerce(npmVersion.stdout).version;
  if (!npmVersion.error && semver.gt(currentNPMVersion, '6.0.0')) {
    process.stdout.write(currentNPMVersion);
    process.stdout.write(chalk.green(' [OK]'));
    process.stdout.write('\r\n');
  } else {
    process.stdout.write(currentNPMVersion);
    process.stdout.write(chalk.red(' [Error] Npm version incorrect'));
    process.stdout.write('\r\n');
    process.exit(1);
  }
  return new Promise((resolve) => {
    resolve(true);
  });
}

/**
 * Check if the node version installed is the correct.
 * 
 * @async
 * @function checkNodeVersion
 * @return {Promise<Boolean>}
 */
async function checkNodeVersion() {
  const nodeVersion = await executeCommand('node -v');
  process.stdout.write(chalk.blue('     Check node version: '));
  const currentNodeVersion = semver.coerce(nodeVersion.stdout).version;
  if (!nodeVersion.error && semver.gt(currentNodeVersion, '7.6.1')) {
    process.stdout.write(currentNodeVersion);
    process.stdout.write(chalk.green(' [OK]'));
    process.stdout.write('\r\n');
  } else {
    process.stdout.write(currentNodeVersion);
    process.stdout.write(chalk.red(' [Error] Node version incorrect'));
    process.stdout.write('\r\n');
    process.exit(1);
  }
  return new Promise((resolve) => {
    resolve(true);
  });
}

/**
 * Check if tassets folder exist.
 * 
 * @function validateImageFolder
 * @return {Boolean}
 */
function validateImageFolder() {
  return fs.existsSync('./assets');
}

/**
 * Create assets folder
 * 
 * @function validateImageFolder
 */
function createAssetsFolder() {
  fs.mkdirSync('./assets');
}