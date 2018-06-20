/**
* @author Victor de Andrés
* @version 0.1.1
* @file prerequisites.js
*
* @module generic
* @description Validate prerequisites
*/

'use strict';

const fs = require('fs');
const semver = require('semver');
const chalk = require('chalk');


const executeCommand = require('./executeCommand');

/**
* checkNpmVersion
* @async @function
* @description Check npm version
* @return { boolean }
*/
async function checkNpmVersion() {
 process.stdout.write(chalk.blue('     Check npm version: '));
 const npmVersion = await executeCommand('npm -v');
 const currentNPMVersion = semver.coerce(npmVersion.stdout).version;
 if ( !npmVersion.error && semver.gt(currentNPMVersion, '6.0.0')) {
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
* checkNodeVersion
* @async @function
* @description Check node version
* @return { boolean }
*/
async function checkNodeVersion() {
 const nodeVersion = await executeCommand('node -v');
 process.stdout.write(chalk.blue('     Check node version: '));
 const currentNodeVersion = semver.coerce(nodeVersion.stdout).version;
 if ( !nodeVersion.error && semver.gt(currentNodeVersion, '7.6.1') ) {
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
* validateImageFolder
* @description check if assets folder exist
* @return { boolean }
*/
function validateImageFolder() {
 return fs.existsSync('./assets');
}

/**
* createAssetsFolder
* @description create assets folder
*/
function createAssetsFolder() {
 fs.mkdirSync('./assets');
}

module.exports = {
 checkNpmVersion,
 checkNodeVersion,
 validateImageFolder,
 createAssetsFolder,
};
