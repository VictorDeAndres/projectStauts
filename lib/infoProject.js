/**
 * Module to generate generic info of project
 * 
 * @async
 * @module infoProject
 * @version 0.2.0
 * 
 * @return {Promise<text>} Text paragraph about info project
 */

'use strict';

const packageFile = 'win32' == process.platform ? require(`${process.cwd()}\\package.json`) : require(`${process.cwd()}/package.json`);
const documentStatus = require('./documentStatus');

module.exports = async () => {
  /**
   * Generate paragraph about info project
   * 
   * @class InfoProject
   * @extends documentStatus
   */
  class InfoProject extends documentStatus {}

  const infoProjectParagraph = new InfoProject();

  infoProjectParagraph.title = `${packageFile.name}`;
  infoProjectParagraph.paragraph = `${packageFile.description}`;

  infoProjectParagraph.returnCarrige();

  await infoProjectParagraph.standardBadge({
    title: 'npm',
    info: packageFile.version,
    color: 'blue',
  });

  await infoProjectParagraph.standardBadge({
    title: 'license',
    info: packageFile.license,
    color: 'blue',
  });

  infoProjectParagraph.returnCarrige();

  return new Promise((resolve) => {
    resolve(infoProjectParagraph.textParagraph);
  });
};