/**
 * @author Victor de Andrés
 * @version 1.0.0
 * @file badgesAudit.js
 *
 * @async @module generic
 * @param  { object } npmAuditData
 * @description Generate badges for resume audit of packages
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
