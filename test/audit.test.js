const test = require('tape-async');
const tapSpec = require('tap-spec');
const auditModule = require('./../lib/audit');

test('Test audit module', (TC) => {
  TC.test('Test generate vulnerabilities badges', async (assert) => {
    const testVulnerabilities = {
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

    const audit = new auditModule.Auditory();
    await audit.generateRowBadges(testVulnerabilities);

    const actual = {
      textParagraph: '![](./assets/info.svg) ![](./assets/low.svg) ![](./assets/moderate.svg) ![](./assets/high.svg) ![](./assets/critical.svg) ',
    };
    const expected = audit;

    assert.deepEqual(actual, expected,
      `Should return svg graph`);

    assert.end();
  });

  TC.test('Test generate info actions auditory', async (assert) => {
    const testActions = {
      actions: [{
        'action': 'install',
        'module': 'karma',
        'target': '2.0.2',
        'isMajor': true,
        'resolves': [{
            'id': 534,
            'path': 'karma>socket.io>debug',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
          {
            'id': 534,
            'path': 'karma>socket.io>engine.io>debug',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
          {
            'id': 534,
            'path': 'karma>socket.io>socket.io-adapter>debug',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
          {
            'id': 534,
            'path': 'karma>socket.io>socket.io-client>debug',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
          {
            'id': 534,
            'path': 'karma>socket.io>socket.io-client>engine.io-client>debug',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
          {
            'id': 534,
            'path': 'karma>socket.io>socket.io-adapter>socket.io-parser>debug',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
          {
            'id': 534,
            'path': 'karma>socket.io>socket.io-client>socket.io-parser>debug',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
          {
            'id': 534,
            'path': 'karma>socket.io>socket.io-parser>debug',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
          {
            'id': 577,
            'path': 'karma>lodash',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
          {
            'id': 550,
            'path': 'karma>socket.io>engine.io>ws',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
          {
            'id': 550,
            'path': 'karma>socket.io>socket.io-client>engine.io-client>ws',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
          {
            'id': 528,
            'path': 'karma>socket.io>socket.io-client>engine.io-client>parsejson',
            'dev': true,
            'optional': false,
            'bundled': false,
          },
        ],
      },
      {
        'action': 'update',
        'module': 'ws',
        'depth': 4,
        'target': '1.1.5',
        'resolves': [{
          'id': 550,
          'path': 'protractor>webdriver-js-extender>selenium-webdriver>ws',
          'dev': true,
          'optional': false,
          'bundled': false,
        }],
      },
    ]};

    const audit = new auditModule.Auditory();
    await audit.generateActions(testActions);

    const actual = '\n   $ npm install --save-dev karma@2.0.2 to resolve 12 vulnerabilities\n   SEMVER WARNING: Recommended action is a potentially breaking change\r\n\n   $ npm update ws --depth 4 to resolve 1 vulnerabilities\r\n';
    const expected = audit.textParagraph;

    assert.equal(actual, expected,
      `Should return text`);

    assert.end();
  });
});

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

