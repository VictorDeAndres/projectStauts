 /**
 * A module to generate status document (Markdown format)
 * 
 * @module documents
 * @version 0.2.0
 * 
 * @public @method generateFile
 * @public @method generateDocument
 */

'use strict';

module.exports = {
  generateFile,
  generateDocument,
};

const fs = require('fs');
const moment = require('moment');
const infoProject = require('./infoProject');
const infoDependencies = require('./dependencies');
const infoAudit = require('./audit');
const infoGitHub = require('./github');
const FILENAME = './STATUS.md';

/**
 * Generate new file => STATUS.md
 * 
 * @function generateFile
 * @return {Boolean}
 */
function generateFile() {
  if (checkFileExist()) {
    fs.unlink(FILENAME, (err) => {
      if (err) throw err;
    });
  }
  return true;
}

/**
 * Write title and call schema of document
 * 
 * @async
 * @private 
 * @function generateDocument
 */
async function generateDocument() {
  const header = `# Project Status
##### ${moment().format('DD MMMM YYYY')}
  `;
  appendToFile(header);
  await generateInfoProject();
  await generateInfoDependencies();
  await generateInfoAudit();
  await generateGitHub();
  
  process.exit(1);
}

/**
 * Check if file exists
 * 
 * @private 
 * @function checkFileExist
 * @return {Boolean}
 */
function checkFileExist() {
  return fs.existsSync(FILENAME);
}

/**
 * Write header info
 * 
 * @async
 * @private 
 * @function generateInfoProject
 * @return {Promise<>}
 */
async function generateInfoProject() {
  appendToFile(await infoProject());
  return new Promise((resolve) => {
    resolve();
  });
}

/**
 * Write info about dependencies
 * 
 * @async
 * @private
 * @function generateInfoDependencies
 * @return {Promise<>}
 */
async function generateInfoDependencies() {
  const textDependencies = await infoDependencies();
  appendToFile(textDependencies);
  return new Promise((resolve) => {
    resolve();
  });
}

/**
 * Write info about audit status
 * 
 * @async
 * @private 
 * @function generateInfoAudit
 * @return {Promise<>}
 */
async function generateInfoAudit() {
  const textAudit = await infoAudit();
  appendToFile(textAudit);
  return new Promise((resolve) => {
    resolve();
  });
}

/**
 * Write info about GitHub
 * 
 * @async
 * @private 
 * @function generateGitHub
 * @return {Promise<>}
 */
async function generateGitHub(){
  const urlRepository = require('./../package.json').repository.url;
  const gitHubClass = new infoGitHub.GitHub();
  return new Promise( async (resolve) => {
    if ( gitHubClass.isGitHubProject(urlRepository) ){
      const textGitHub = await infoGitHub();
      appendToFile(textGitHub);  
    }
    resolve();
  });  
}

/**
 * Append text to file.
 * 
 * @private
 * @function appendToFile
 * @param  {String} - Text to append to file
 */
function appendToFile(text) {
  fs.appendFileSync(FILENAME, text, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}