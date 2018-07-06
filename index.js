/**
 * Main module
 * @module index.js
 * @version 0.2.0
 */

const spinner = require('./lib/spinner');
const prerequisites = require('./lib/prerequisites');
const checkParameters = require('./lib/argument');
const document = require('./lib/document');
const chalk = require('chalk');

module.exports = async function (passArguments) {

  const statusProject = {};
  statusProject.arguments = require('minimist')(passArguments);

  if (global.statusProject == null) {
    global = {
      statusProject
    };
  }

  // Check prerequisites
  prerequisites.checkPackageJson();
  await prerequisites.checkNpmVersion();
  await prerequisites.checkNodeVersion();
  if (!prerequisites.validateImageFolder()) {
    prerequisites.createAssetsFolder();
  }
  // eof Check prerequisites

  // Generate markdown document
  spinner.start(' Generate project status document ');
  if (document.generateFile()) {
    document.generateDocument();
  };
  // eof Generate markdown document
  process.stdout.write('\r\n');
};
