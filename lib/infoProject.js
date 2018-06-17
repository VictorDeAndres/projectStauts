/**
 * @author Victor de Andrés
 * @version 1.0.0
 * @file infoProject.js
 *
 * @async @module generic
 * @description Generate generic info of project
 */

'use strict';

const packageFile = require('./../package.json');
const StatusMarkDown = require('./statusMarkDown');

class InfoProject extends StatusMarkDown {}

module.exports = async () => {
  const infoProjectParagraph = new InfoProject();

  infoProjectParagraph.title = `${packageFile.name}`;
  infoProjectParagraph.paragraph = `${packageFile.description}`;

  infoProjectParagraph.returnCarrige();

  await infoProjectParagraph.standardBadge({
    title: 'version',
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