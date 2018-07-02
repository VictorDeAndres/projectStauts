/**
 * Module to generate audit badges
 * 
 * @module badgesAudit
 * @version 0.2.0
 * 
 * @param {Object} - Response npm audit command
 * @return {Object} - Badges
 */

'use strict';

module.exports = (npmAuditData) => {
  const colorsBadgeAudit = [
    'green',
    'yellowgreen',
    'yellow',
    'orange',
    'red',
  ];

  return Object.entries(npmAuditData.vulnerabilities).map( (auditData, idx) => {
    return {
      title: auditData[0],
      info: auditData[1].toString(),
      color: colorsBadgeAudit[idx],
    };
  });
};
