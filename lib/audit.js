/**
 * Module to generate audit info
 * 
 * @module audit
 * @version 0.2.0
 * 
 * @return {Promise<text>} Text paragraph with audit info
 */

'use strict';

const executeCommand = require('./executeCommand');
const generateBadge = require('./badge');
const badgesAudit = require('./badgesAudit');
const documentStatus = require('./documentStatus.js');


module.exports = async () => {

  /**
   * Generate paragraph with audit ino
   * 
   * @class Auditory
   * @extends documentStatus
   */
  const Auditory = class Auditory extends documentStatus {

    /**
     * Write header of type of actions 
     * 
     * @memberof Dependencies#showAdvisories
     * @param {Object, Integer} - Advisories, idAdvisory
     */
    showAdvisories(advisories, idAdvisory) {
      if (advisories[idAdvisory]) {
        this.returnCarrige();
        this.textParagraph += `\n   Overview: ${advisories[idAdvisory].overview}`;
        this.returnCarrige();
        this.textParagraph += `\n   Recommendation: ${advisories[idAdvisory].recommendation}`;
      };
    }

    /**
     * Write summary badges. Generate badge by type
     * 
     * @async
     * @memberof Dependencies#generateRowBadges
     * @param {Object} - Vulnerabilities 
     */
    async generateRowBadges(vulnerabilities) {
      const badgeVulnerabilities = badgesAudit(vulnerabilities);
      for (const vulnerability of badgeVulnerabilities) {
        this.textParagraph += `${await generateBadge(vulnerability)} `;
      }
    }

    /**
     * Write recomendy actions to fix vulnerabilities
     * 
     * @async
     * @memberof Dependencies#generateActions
     * @param {Object} - Vulnerabilities 
     */
    async generateActions(vulnerabilities) {
      for (const action of vulnerabilities.actions) {
        switch (action.action) {
          case 'install':
            this.textParagraph += `\n   $ npm ${action.action} ${action.resolves[0].dev ? '--save-dev' : 'save'} ${action.module}@${action.target} to resolve ${action.resolves.length} vulnerabilities`;
            if (action.isMajor) {
              this.textParagraph += `\n   SEMVER WARNING: Recommended action is a potentially breaking change`;
            }
            break;
          case 'update':
            this.textParagraph += `\n   $ npm ${action.action} ${action.module} --depth ${action.depth} to resolve ${action.resolves.length} vulnerabilities`;
            break;
          case 'review':
            this.textParagraph += `\n   Review "${action.module}" package, no patches are available.`;
            this.showAdvisories(vulnerabilities.advisories, action.resolves[0].id);
            break;
          default:
            break;
        }
        this.returnCarrige();
      }
    }
  };
  // eof class Dependencies

  const Audit = new Auditory();
  // Header
  Audit.title = `Audit Dependencies`;

  // Generate badge
  const npmAuditData = await executeCommand('npm audit -json');
  const currentVulnerabilities = JSON.parse(npmAuditData.stdout);

  if (currentVulnerabilities.metadata) {
    await Audit.generateRowBadges(currentVulnerabilities.metadata);
    Audit.returnCarrige();
  }

  Audit.subTitle = `actions`;

  if (currentVulnerabilities.actions) {
    await Audit.generateActions(currentVulnerabilities);
  } else {
    Audit.textParagraph = 'No actions to do';
  }

  // Generate text
  return new Promise((resolve) => {
    resolve(Audit.textParagraph);
  });
};