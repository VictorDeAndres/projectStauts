/**
 * @author Victor de Andrés
 * @version 0.1.9
 * @file badge.js
 *
 * @async @module generic
 * @param  { object } badgeInfo
 * @description Generate badges
 */

'use strict';

const fs = require('fs');
const badge = require('badge-up');

function writeBadge(title, svgImage) {
  fs.writeFileSync(`./assets/${title}.svg`, svgImage, 'utf-8', (err) => {
    if (err) {
      process.stdout.write('\r\n');
      process.stdout.write(chalk.red(`[Error] ${err}` ));
      process.stdout.write('\r\n');
      process.exit(1);
    }
    return true;
  });
}

module.exports = (badgeInfo) => {
  return new Promise((resolve) => {
    badge(badgeInfo.title ? badgeInfo.title : '', badgeInfo.info ? badgeInfo.info : '', badge.colors[badgeInfo.color] ? badge.colors[badgeInfo.color] : 'white', function(error, svgImage) {
      writeBadge(badgeInfo.title.replace(/[\/\\]/gm, '-'), svgImage);
      resolve(`![](./assets/${badgeInfo.title.replace(/[\/\\]/gm, '-')}.svg)`);
    });
  });
};