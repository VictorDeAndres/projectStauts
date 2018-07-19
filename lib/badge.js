/**

 * Module to generate files with badges
 * 
 * @module badges
 * @version 0.2.0
 * 
 * @return {text} Text with badge url
 */

'use strict';

const fs = require('fs');
const badge = require('badge-up');

/**
 * Save badge file
 *
 * @private
 * @function writeBadge
 * @param {String, String} - Title of badge, svg image
 * @return {Boolean} 
 */
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
    badge(badgeInfo.title ? badgeInfo.title : '', badgeInfo.info ? badgeInfo.info : '', badge.colors[badgeInfo.color] ? badge.colors[badgeInfo.color] : badgeInfo.color, function(error, svgImage) {
      writeBadge(badgeInfo.title.replace(/[\/\\ ]/gm, '-'), svgImage);
      resolve(`![](./assets/${badgeInfo.title.replace(/[\/\\ ]/gm, '-')}.svg)`);
    });
  });
};
