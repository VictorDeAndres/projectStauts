/**
 * @author Victor de Andrés
 * @version 0.1.0
 * @file infoProject.js
 *
 * @async @module generic
 * @public @method generateFile
 * @public @method generateDocument
 * @description Generate Status document (Markdown format)
 */

'use strict';

const fs = require('fs');
const moment = require('moment');

const infoProject = require('./infoProject');
const infoDependencies = require('./dependencies').dependenciesParagraph;
const infoAudit = require('./audit').auditParagraph;

const FILENAME = './STATUS.md';

/**
 * Check if file exists
 * @private @function checkFileExist
 * @return { bool }
 */
function checkFileExist() {
  return fs.existsSync(FILENAME);
}

/**
 * Generate new file => STATUS.md
 * @private @function generateFile
 * @return { bool }
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
 * @private @function generateDocument
 * @async
 */
async function generateDocument() {
  const header = `# Project Status
##### ${moment()}
  `;
  appendToFile(header);
  await generateInfoProject();
  await generateInfoDependencies();
  await generateInfoAudit();
  process.exit(1);
}

/**
 * Write header info
 * @private @function generateInfoProject
 * @async
 * @return { promise }
 */
async function generateInfoProject() {
  appendToFile(await infoProject());
  return new Promise((resolve) => {
    resolve();
  });
}

/**
 * Write info about dependencies
 * @private @function generateInfoDependencies
 * @async
 * @return { promise }
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
 * @private @function generateInfoAudit
 * @async
 * @return { promise }
 */
async function generateInfoAudit() {
  const textAudit = await infoAudit();
  appendToFile(textAudit);
  return new Promise((resolve) => {
    resolve();
  });
}

/**
 * Append text to file.
 * @private @function appendToFile
 * @param  { string } text
 */
function appendToFile(text) {
  // process.stdout.write(chalk.blue('.'));
  fs.appendFileSync(FILENAME, text, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}

module.exports = {
  generateFile,
  generateDocument,
};
