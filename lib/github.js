const github = require('octonode');
const generateBadge = require('./badge');

function connectGitHub() {
  return github.client({
    username: 'victor.deandres@gmail.com',
    password: '4ZYScZ43b96L',
  });
}

function getIssues() {
  const client = connectGitHub();

  client.get('/user', {}, function(err, status, body, headers) {
    if (!err) {
      const ghrepo = client.repo('VictorDeAndres/TestMilestone');
      ghrepo.issues(function(err, data, headers) {
        if (!err) {
          const currentStatus = {
            'issues': {
              'title': 'open Issues',
              'info': data.length.toString(),
              'color': data.length === 0 ? 'green' : 'red',
            },
          };

          Object.entries(currentStatus).map((badge) => {
            generateBadge(badge);
          });
        }
      });
    }
  });
}

function getMilesone() {
  const client = connectGitHub();

  client.get('/user', {}, function(err, status, body, headers) {
    if (!err) {
      const ghmilestone = client.repo('VictorDeAndres/TestMilestone/milestones/1');
      ghmilestone.info(function(err, data, headers) {
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

module.exports = {
  getIssues,
  getMilesone,
};
