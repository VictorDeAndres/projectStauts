/**
 * @author Victor de Andrés
 * @version 1.0.0
 * @file dependencies.js
 *
 * @async @module generic
 * @public @method generateFile
 * @public @method generateDocument
 * @description Generate Status document (Markdown format)
 */

'use strict';

const executeCommand = require('./executeCommand');
const generateBadge = require('./badge');
const badgeDependencies = require('./badgesDependencies');
const StatusMarkDown = require('./statusMarkDown');

const Dependencies = class Dependencies extends StatusMarkDown {
  /**
   * Read dependencies state from package.json
   * @return { promise }
   */
  async readDependencies() {
    const npmOutdatedData = await executeCommand('npm outdated -l -json');
    return new Promise( (resolve) => {
      resolve(npmOutdatedData.stdout || {})
      if ( npmOutdatedData ) {
        npmOutdatedData.error.code === 1
          ? resolve(npmOutdatedData.stdout || {})
          : this.printError({
            error: {
              code: '',
              summary: npmOutdatedData.error
            }
          });
      }
    });
  }

  /**
   * generate label(s) for project dependencies
   * @param  { object } dependencies
   */
  async generateBadgeDependencies(dependencies) {
    Object.entries(dependencies).map( async (dependence) => {
      this.textParagraph += `${await generateBadge(dependence[1])} `;
    });
  }

  /**
   * generate label(s) for project devDependencies
   * @param  { object } devDependencies
   */
  async generateBadgeDevDependencies(devDependencies) {
    Object.entries(devDependencies).map( async (dependence) => {
      this.textParagraph += `${await generateBadge(dependence[1])} `;
    });
  }
};

const dependenciesParagraph = async () => {
  const dependenciesParagraph = new Dependencies();

  const currentDependencies = badgeDependencies(JSON.parse(await dependenciesParagraph.readDependencies()));

  dependenciesParagraph.title = `Status Dependencies`;
  dependenciesParagraph.subTitle = `dependencies`;

  Object.keys(currentDependencies.dependencies).length !== 0 
    ? await dependenciesParagraph.generateBadgeDependencies(currentDependencies.dependencies)
    : await dependenciesParagraph.standardBadge({
      title: 'dependencies',
      info: 'update to date',
      color: 'green',
    });

  dependenciesParagraph.returnCarrige();

  dependenciesParagraph.subTitle = `devDependencies`;
  Object.keys(currentDependencies.devDependencies).length !== 0 
    ? await dependenciesParagraph.generateBadgeDevDependencies(currentDependencies.devDependencies)
    : await dependenciesParagraph.standardBadge({
      title: 'dependencies',
      info: 'update to date',
      color: 'green',
    });

  dependenciesParagraph.returnCarrige();

  return new Promise((resolve) => {
    resolve(dependenciesParagraph.textParagraph);
  });
};

module.exports.dependenciesParagraph = dependenciesParagraph;
/* Export class to make test */
module.exports.Dependencies = Dependencies;
