/**
 * Generate common parts of documents
 * 
 * @module documentStatus
 * @version 0.2.0
 * 
 * @class documentStatus
 */
'use strict';

const generateBadge = require('./badge');
const chalk = require('chalk');

module.exports = class documentStatus {

  /**
   * Create GitHub paragraph.
   * 
   * @constructor
   */
  constructor() {
    this.textParagraph = '';
  }

  /**
   * Set Title
   * 
   * @memberof documentStatus#setTitle
   * @param {String} - Title
   */
  set title(text) {
    this.textParagraph += `## ${text}\r\n`;
  }

  /**
   * Get Title
   * 
   * @memberof documentStatus#getTitle
   * @return {String} - Title
   */
  get title() {
    return this.textParagraph;
  }

  /**
   * Set subTitle
   * 
   * @memberof documentStatus#setSubTitle
   * @param {String} - SubTitle
   */
  set subTitle(text) {
    this.textParagraph += `### ${text}\r\n`;
  }

  /**
   * Get subTitle
   * 
   * @memberof documentStatus#getSubTitle
   * @return {String} - SubTitle
   */
  get subTitle() {
    return this.textParagraph;
  }

  /**
   * Set miniSubTitle
   * 
   * @memberof documentStatus#setminiSubTitle
   * @param {String} - miniSubTitle
   */
  set miniSubTitle(text) {
    this.textParagraph += `#### ${text}\r\n`;
  }

  /**
   * Get miniSubTitle
   * 
   * @memberof documentStatus#getminiSubTitle
   * @return {String} - miniSubTitle
   */
  get miniSubTitle() {
    return this.textParagraph;
  }

  /**
   * Set Paragraph
   * 
   * @memberof documentStatus#setParagraph
   * @param {String} - Paragraph
   */
  set paragraph(text) {
    this.textParagraph += `${text}\r\n`;
  }

  /**
   * Get Paragraph
   * 
   * @memberof documentStatus#getParagraph
   * @return {String} - Paragraph
   */
  get paragraph() {
    return this.textParagraph;
  }

  /**
   * Write link to badge
   * 
   * @memberof documentStatus#standardBadge
   * @param {Object} - Badge
   */
  async standardBadge(badge) {
    this.textParagraph += `${await generateBadge(badge)} `;
  }

  /**
   * Write return carriege
   * 
   * @memberof documentStatus#returnCarrige
   */
  returnCarrige() {
    this.textParagraph += `\r\n`;
  }

  /**
   * Write error message to console
   * 
   * @memberof documentStatus#printError
   * @return {Object} - Error message
   */
  printError(message) {
    if (typeof message !== 'object') {
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