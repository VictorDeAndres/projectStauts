/**
 * Module to dependencies badges
 * 
 * @async
 * @module dependencies
 * @version 0.2.0
 *
 * @param  {Object} - npmOutdatedData
 * @return {Object} - Object with dependencies badges and devDependencies badges
 */

'use strict';

const semver = require('semver');

module.exports = (npmOutdatedData) => {
  const dependencies = {};
  const devDependencies = {};
  Object.entries(npmOutdatedData).map( (packageJson) => {
    if ( packageJson[1].current !== packageJson[1].latest ) {
      const objectTest = {
        title: packageJson[0],
        info: `${packageJson[1].current} > ${packageJson[1].latest}`,
        color: calculateColor(packageJson[1]),
      };

      switch (packageJson[1].type) {
        case 'dependencies':
          dependencies[packageJson[0]] = objectTest;
          break;
        case 'devDependencies':
          devDependencies[packageJson[0]] = objectTest;
          break;
        default:
        break;
      }
    }
  });

  return {
    dependencies,
    devDependencies,
  };
};

/**
 * Calculate color of badge
 * 
 * @private
 * @function calculateColor
 * Major update => red
 * Minor update => yellow
 * Patch update => green
 * 
 * @param  {Object} - packageData
 * @return {String} - Color
 */

function calculateColor(packageData) {
  if ( semver.major(packageData.current) < semver.major(packageData.latest) ) {
    return 'red';
  }

  if ( semver.minor(packageData.current) < semver.minor(packageData.latest) ) {
    return 'yellow';
  }

  if ( semver.patch(packageData.current) < semver.patch(packageData.latest) ) {
    return 'green';
  }
}