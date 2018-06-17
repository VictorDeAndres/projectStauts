const test = require('tape-async');
const badgesDependenciesModule = require('./../lib/badgesDependencies.js');

const testBadges = {
  '@angular-devkit/build-angular': {
    'current': '0.6.3',
    'wanted': '0.6.8',
    'latest': '0.6.8',
    'location': 'node_modules\\@angular-devkit\\build-angular',
    'type': 'devDependencies',
  },
  '@angular/animations': {
    'current': '6.0.2',
    'wanted': '6.0.4',
    'latest': '6.0.4',
    'location': 'node_modules\\@angular\\animations',
    'type': 'dependencies',
  },
};

test('Test module badgesDependencies', function(TC) {
  TC.test('Test generage green badge // Patch update', (assert) => {
    const actual = {
      dependencies: {
        '@angular/animations': {
          title: '@angular/animations',
          info: '6.0.2 > 6.0.4',
          color: 'green',
        },
      },
      devDependencies: {
        '@angular-devkit/build-angular': {
          title: '@angular-devkit/build-angular',
          info: '0.6.3 > 0.6.8',
          color: 'green',
        },
      },
    };

    const expected = badgesDependenciesModule(testBadges);
    assert.deepEqual(actual, expected,
      `Should return green badge`);

    assert.end();
  });

  TC.test('Test generage yellow badge // Minor update', (assert) => {
    testBadges['@angular/animations']['latest'] = '6.1.2';
    testBadges['@angular-devkit/build-angular']['latest'] = '0.7.1';

    const actual = {
      dependencies: {
        '@angular/animations': {
          title: '@angular/animations',
          info: '6.0.2 > 6.1.2',
          color: 'yellow',
        },
      },
      devDependencies: {
        '@angular-devkit/build-angular': {
          title: '@angular-devkit/build-angular',
          info: '0.6.3 > 0.7.1',
          color: 'yellow',
        },
      },
    };

    const expected = badgesDependenciesModule(testBadges);
    assert.deepEqual(actual, expected,
      `Should return yellow badge`);

    assert.end();
  });

  TC.test('Test generage red badge // Major update', (assert) => {
    testBadges['@angular/animations']['latest'] = '7.0.1';
    testBadges['@angular-devkit/build-angular']['latest'] = '1.7.5';

    const actual = {
      dependencies: {
        '@angular/animations': {
          title: '@angular/animations',
          info: '6.0.2 > 7.0.1',
          color: 'red',
        },
      },
      devDependencies: {
        '@angular-devkit/build-angular': {
          title: '@angular-devkit/build-angular',
          info: '0.6.3 > 1.7.5',
          color: 'red',
        },
      },
    };

    const expected = badgesDependenciesModule(testBadges);
    assert.deepEqual(actual, expected,
      `Should return red badge`);

    assert.end();
  });
});

