/**
 * @author Victor de Andrés
 * @version 1.0.0
 * @file statusMarkDown.js
 *
 * @class StatusMarkDown
 * @description Common write operations in Status File
 *
 * @public @method title
 * @public @method subTitle
 * @public @method standardBadge
 * @public @method returnCarrige
 */

'use strict';

const generateBadge = require('./badge');
const chalk = require('chalk');

module.exports = class StatusMarkDown {
  constructor() {
    this.textParagraph = '';
  }

  set title(text) {
    this.textParagraph += `## ${text}\r\n`;
  }

  get title() {
    return this.textParagraph;
  }

  set subTitle(text) {
    this.textParagraph += `### ${text}\r\n`;
  }

  get subTitle() {
    return this.textParagraph;
  }

  set paragraph(text) {
    this.textParagraph += `${text}\r\n`;
  }

  get paragraph() {
    return this.textParagraph;
  }

  /**
   * Write new badge.
   * @param { object } badge
   */
  async standardBadge(badge) {
    this.textParagraph += `${await generateBadge(badge)} `;
  }

  /**
   * Write returnCarrige
   */
  returnCarrige() {
    this.textParagraph += `\r\n`;
  }

  /**
   * Print error in console and exit process
   * @param  { object } message
   */
  printError(message) {
    if ( typeof message !== 'object' ){
      message = JSON.parse(message);
    }
    process.stdout.write(`\r\n`);
    process.stdout.write(`\r\n`);
    process.stdout.write(chalk.red(`[ERROR]: ${message.error.code}. ${message.error.summary}`));
    process.stdout.write(`\r\n`);
    process.stdout.write(`${message.error.detail}`);
    process.exit(1);
  }
};
