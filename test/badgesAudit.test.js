const test = require('tape-async');
const badgesAuditModule = require('./../lib/badgesAudit');

const testBadges = {
  'vulnerabilities': {
    'info': 0,
    'low': 9,
    'moderate': 0,
    'high': 4,
    'critical': 0,
  },
  'dependencies': 24,
  'devDependencies': 21818,
  'optionalDependencies': 1969,
  'totalDependencies': 21842,
};

test('Test module badgesAudit', function(TC) {
  TC.test('Test generage object with badges', (assert) => {
    const actual = [
      {
        title: 'info',
        info: '0',
        color: 'green',
      }, {
        title: 'low',
        info: '9',
        color: 'yellowgreen',
      }, {
        title: 'moderate',
        info: '0',
        color: 'yellow',
      }, {
        title: 'high',
        info: '4',
        color: 'orange',
      }, {
        title: 'critical',
        info: '0',
        color: 'red',
      },
    ];

    const expected = badgesAuditModule(testBadges);
    assert.deepEqual(actual, expected,
      `Should return badges`);

    assert.end();
  });
});

