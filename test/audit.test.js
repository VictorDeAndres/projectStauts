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
      textParagraph: '<svg xmlns="http://www.w3.org/2000/svg" width="49" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="49" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h32v20H0z"/><path fill="#97CA00" d="M32 0h17v20H32z"/><path fill="url(#b)" d="M0 0h49v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="16" y="15" fill="#010101" fill-opacity=".3">info</text><text x="16" y="14">info</text><text x="39.5" y="15" fill="#010101" fill-opacity=".3">0</text><text x="39.5" y="14">0</text></g></svg> <svg xmlns="http://www.w3.org/2000/svg" width="47" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="47" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h30v20H0z"/><path fill="#A4A61D" d="M30 0h17v20H30z"/><path fill="url(#b)" d="M0 0h47v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="15" y="15" fill="#010101" fill-opacity=".3">low</text><text x="15" y="14">low</text><text x="37.5" y="15" fill="#010101" fill-opacity=".3">9</text><text x="37.5" y="14">9</text></g></svg> <svg xmlns="http://www.w3.org/2000/svg" width="81" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="81" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h64v20H0z"/><path fill="#DFB317" d="M64 0h17v20H64z"/><path fill="url(#b)" d="M0 0h81v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="32" y="15" fill="#010101" fill-opacity=".3">moderate</text><text x="32" y="14">moderate</text><text x="71.5" y="15" fill="#010101" fill-opacity=".3">0</text><text x="71.5" y="14">0</text></g></svg> <svg xmlns="http://www.w3.org/2000/svg" width="52" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="52" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h35v20H0z"/><path fill="#FE7D37" d="M35 0h17v20H35z"/><path fill="url(#b)" d="M0 0h52v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="17.5" y="15" fill="#010101" fill-opacity=".3">high</text><text x="17.5" y="14">high</text><text x="42.5" y="15" fill="#010101" fill-opacity=".3">4</text><text x="42.5" y="14">4</text></g></svg> <svg xmlns="http://www.w3.org/2000/svg" width="67" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="67" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h50v20H0z"/><path fill="#E05D44" d="M50 0h17v20H50z"/><path fill="url(#b)" d="M0 0h67v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="25" y="15" fill="#010101" fill-opacity=".3">critical</text><text x="25" y="14">critical</text><text x="57.5" y="15" fill="#010101" fill-opacity=".3">0</text><text x="57.5" y="14">0</text></g></svg> ',
    };
    const expected = audit;

    assert.deepEqual(actual, expected,
      `Should return svg graph`);

    assert.end();
  });

  TC.test('Test generate info actions auditory', async (assert) => {
    const testActions = [{
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
    ];

    const audit = new auditModule.Auditory();
    await audit.generateActions(testActions);

    const actual = '\n  \t$ npm install --save-dev karma@2.0.2 to resolve 12 vulnerabilities\n  \tSEMVER WARNING: Recommended action is a potentially breaking change\r\n\n  \t$ npm update ws --depth 4 to resolve 1 vulnerabilities\r\n';
    const expected = audit.textParagraph;

    console.info('Testtses:', expected);
    assert.equal(actual, expected,
      `Should return text`);

    assert.end();
  });
});

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

