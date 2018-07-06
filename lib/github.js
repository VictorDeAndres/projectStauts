/**
 * Module to generate generic github paragraph
 * 
 * @async
 * @module github
 * @version 0.2.0
 * 
 * @return {Promise<text>} Text paragraph about info project
 */

const _ = require('lodash');
const documentStatus = require('./documentStatus');
const github = require('octonode');
const generateBadge = require('./badge');

module.exports = async () => {

  const gitHubParagraph = new GitHub();
  let OpenIssues = 0;

  gitHubParagraph.title = `GitHub Information`;
  gitHubParagraph.labels = await gitHubParagraph.getLabels();
  OpenIssues = await gitHubParagraph.getIssues();

  if ( OpenIssues > 0 ){
    gitHubParagraph.subTitle = `Open Issues`;
    await gitHubParagraph.standardBadge({
      title: 'Open Issues',
      info: OpenIssues.toString(),
      color: 'blue',
    });

    gitHubParagraph.returnCarrige();
    gitHubParagraph.miniSubTitle = `Resume by tags`;
    if ( gitHubParagraph.labels.length !== 0 ){
      for ( idxLabel in gitHubParagraph.labels ) {
        gitHubParagraph.textParagraph += `${await generateBadge(gitHubParagraph.labels[idxLabel])} `;
        gitHubParagraph.returnCarrige();
      }  
    } 
  }

  return new Promise((resolve) => {
    resolve(gitHubParagraph.textParagraph);
  });
}

/**
 * Fill number de issues by label
 * 
 * @private
 * @function fillIssues
 * @param  {Object} - Badge of labels
 */
function fillIssues(Labels) {
  this.labels = Labels;
  return function(label){
    this.labels.forEach( (element, idx) => {
      if ( element.title === label ) {
        this.labels[idx].info = (parseInt(this.labels[idx].info) + 1).toString();
      }
    });
  }
};

/**
 * Generate Github info
 * 
 * @class Github
 * @extends documentStatus
 */
const GitHub = class GitHub extends documentStatus {

  /**
   * Create GitHub paragraph.
   * 
   * @constructor
   */
  constructor(){
    super();
    this.labels = [];
  }

  /**
   * Is GitHub project
   * 
   * @memberof Github#isGitHubProject
   * @return {Boolean}
   */
  isGitHubProject(urlRepository) {
    return /github/.test(urlRepository);
  }

  /**
   * Extract the folder of github respository
   * 
   * @memberof Github#extractProject
   * @return {String} - The folder of respository
   */
  extractProject() {
    const urlRepository = require('./../package.json').repository.url;
    const projectFolder = urlRepository.split('/').slice(urlRepository.split('/').length - 2).join('/');
    return projectFolder.split('.')[0];
  }

  /**
   * Establish connect with Github repository service
   * 
   * @memberof Github#connectGitHub
   * @return {Boolean}
   */
  connectGitHub() {
    return github.client();
    // return github.client({
    //   username: global.statusProject.arguments.user,
    //   password: global.statusProject.arguments.pass || global.statusProject.arguments.password,
    // });
  }

  /**
   * Check connection with github service
   * 
   * @memberof Github#checkClientConnection
   * @return {Object} - error message from api github
   */
  checkClientConnection() {
    const client = this.connectGitHub();
    return new Promise((resolve) => {
      client.get('/user', {}, function (err, status, body, headers) {
        resolve(err || {});
      });
    });
  }

  /**
   * Check connection with github service
   * 
   * @memberof Github#checkClientConnection
   * @return {Object} - error message from api github
   */
  getLabels() {
    const client = this.connectGitHub();
    return new Promise((resolve) => {
      const ghrepo = client.repo(this.extractProject());
      ghrepo.labels(function (err, data) {
        resolve(data.map( element => {
            return { 
              'title': element['name'],
              'info': '0',
              'color': `#${element['color'] === 'ffffff' ? '000000' : element['color']}`
            }
          })
        );
      });
    });
  }

  /**
   * Check issues from github project
   * 
   * @memberof Github#getIssuess
   * @return {Object} - error message from api github
   */
  getIssues(){
    const client = github.client();
    const FillIssues = fillIssues(this.labels);
    return new Promise((resolve) => {
      const ghrepo = client.repo(this.extractProject());
      ghrepo.issues(function (err, data) {
        let Issues = 0;
        if (!err) {
          data.forEach(element => {
            if ( !element.milestone ){
              Issues++;
              element.labels.forEach( elem => {
                FillIssues(elem.name);
              })
            }
          });
        }
        resolve(Issues);
      });
    });
  }

  getMilesone() {
    const client = connectGitHub();

    client.get('/user', {}, function (err, status, body, headers) {
      if (!err) {
        const ghmilestone = client.repo('VictorDeAndres/TestMilestone/milestones/1');
        ghmilestone.info(function (err, data, headers) {
          if (!err) {
            const openIssues = Number(data.open_issues);
            const closeIssues = Number(data.closed_issues);
            const percentage = ((closeIssues / (openIssues + closeIssues)) * 100).toFixed(2);

            let colorBadge = 'red';
            switch (true) {
              case percentage > 33.33 && percentage < 50:
                colorBadge = 'orange';
                break;
              case percentage > 50 && percentage < 83.33:
                colorBadge = 'yellow';
                break;
              case percentage > 83.33:
                colorBadge = 'green';
                break;
              default:
                break;
            }

            const currentMilestone = {
              'milestone': {
                'title': 'Milestone',
                'info': `[${closeIssues}/${openIssues + closeIssues}] ${percentage}%`,
                'color': colorBadge,
              },
            };

            Object.entries(currentMilestone).map((badge) => {
              generateBadge(badge);
            });
          }
        });
      }
    });
  }
  //
}



/* Export class to make test */
module.exports.GitHub = GitHub;

