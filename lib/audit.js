/**
 * @author Victor de Andrés
 * @version 1.0.0
 * @file audit.js
 *
 * @async @module generic
 * @description Generate audit paragraph (Markdown format)
 */


'use strict';

const executeCommand = require('./executeCommand');
const generateBadge = require('./badge');
const badgesAudit = require('./badgesAudit');
const statusMarkDown = require('./statusMarkDown.js');

const Auditory = class Auditory extends statusMarkDown {
 showAdvisories(advisories, idAdvisory) {
   if (advisories[idAdvisory]) {
     this.returnCarrige();
     this.textParagraph += `\n   Overview: ${advisories[idAdvisory].overview}`;
     this.returnCarrige();
     this.textParagraph += `\n   Recommendation: ${advisories[idAdvisory].recommendation}`;
   };
 }

 async generateRowBadges(vulnerabilities) {
   const badgeVulnerabilities = badgesAudit(vulnerabilities);
   for ( const vulnerability of badgeVulnerabilities ) {
     this.textParagraph += `${await generateBadge(vulnerability)} `;
   }
 }

 async generateActions(vulnerabilities) {
   for ( const action of vulnerabilities.actions) {
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

const auditParagraph = async () => {
 const Audit = new Auditory();
 // Header
 Audit.title = `Audit Dependencies`;

 // Generate badge
 const npmAuditData = await executeCommand('npm audit -json');
 const currentVulnerabilities = JSON.parse(npmAuditData.stdout);

 if ( currentVulnerabilities.metadata ) {
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



module.exports.auditParagraph = auditParagraph;
/* Export class to do test */
module.exports.Auditory = Auditory;
