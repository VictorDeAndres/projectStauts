/**
 * @author Victor de Andrés
 * @version 1.0.0
 * @file badgesDependencies.js
 *
 * @async @module generic
 * @param  { object } npmOutdatedData
 * @public @method dependencies
 * @public @method devDependencies
 * @description Generate badges for dependencies
 */

'use strict';

const semver = require('semver');

/**
 * @private @function
 * @description Calculate color.
 * Major update => red
 * Minor update => yellow
 * Patch update => green
 * @param  { object } packageData
 * @return { string }
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
