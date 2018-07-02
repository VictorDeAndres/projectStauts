 /**
 * Module to generate generic info of dependencies and devdepencies
 * 
 * @async
 * @module dependencies
 * @version 0.2.0
 * 
 * @return {Promise<text>} Text paragraph about info project
 */

'use strict';

const executeCommand = require('./executeCommand');
const generateBadge = require('./badge');
const badgeDependencies = require('./badgesDependencies');
const documentStatus = require('./documentStatus');

module.exports = async () => {

  /**
   * Generate paragraph about dependencies and devdependecies
   * 
   * @class Dependencies
   * @extends documentStatus
   */
  const Dependencies = class Dependencies extends documentStatus {

    /**
     * Read dependencies state from package.json
     * 
     * @async
     * @memberof Dependencies#readDependencies
     * @return {Object}
     */    
    async readDependencies() {
      const npmOutdatedData = await executeCommand('npm outdated -l -json');
      return new Promise((resolve) => {
        resolve(npmOutdatedData.stdout || {})
        if (npmOutdatedData) {
          npmOutdatedData.error.code === 1 ?
            resolve(npmOutdatedData.stdout || {}) :
            this.printError({
              error: {
                code: '',
                summary: npmOutdatedData.error
              }
            });
        }
      });
    }

    /**
     * Generate label(s) for project dependencies
     * 
     * @async
     * @memberof Dependencies#readDependencies
     * @param  {Object} dependencies
     */
    async generateBadgeDependencies(dependencies) {
      Object.entries(dependencies).map(async (dependence) => {
        this.textParagraph += `${await generateBadge(dependence[1])} `;
      });
    }

    /**
     * Generate abel(s) for project devDependencies
     * 
     * @async
     * @memberof Dependencies#readDependencies
     * @param  {Object} devDependencies
     */    
    async generateBadgeDevDependencies(devDependencies) {
      Object.entries(devDependencies).map(async (dependence) => {
        this.textParagraph += `${await generateBadge(dependence[1])} `;
      });
    }
  };
  // eof class Dependencies
  
  const dependenciesParagraph = new Dependencies();

  const currentDependencies = badgeDependencies(JSON.parse(await dependenciesParagraph.readDependencies()));

  dependenciesParagraph.title = `Status Dependencies`;
  dependenciesParagraph.subTitle = `dependencies`;

  Object.keys(currentDependencies.dependencies).length !== 0 ?
    await dependenciesParagraph.generateBadgeDependencies(currentDependencies.dependencies) :
    await dependenciesParagraph.standardBadge({
      title: 'dependencies',
      info: 'update to date',
      color: 'green',
    });

  dependenciesParagraph.returnCarrige();

  dependenciesParagraph.subTitle = `devDependencies`;
  Object.keys(currentDependencies.devDependencies).length !== 0 ?
    await dependenciesParagraph.generateBadgeDevDependencies(currentDependencies.devDependencies) :
    await dependenciesParagraph.standardBadge({
      title: 'dependencies',
      info: 'update to date',
      color: 'green',
    });

  dependenciesParagraph.returnCarrige();

  return new Promise((resolve) => {
    resolve(dependenciesParagraph.textParagraph);
  });
};