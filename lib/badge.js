/**
 * @author Victor de Andrés
 * @version 1.0.0
 * @file badge.js
 *
 * @async @module generic
 * @param  { object } badgeInfo
 * @description Generate badges
 */

'use strict';

const badge = require('badge-up');

module.exports = (badgeInfo) => {
  return new Promise((resolve) => {
    badge(badgeInfo.title, badgeInfo.info, badge.colors[badgeInfo.color], function(error, svg) {
      resolve(svg);
    });
  });
};
