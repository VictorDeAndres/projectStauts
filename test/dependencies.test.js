const test = require('tape-async');
const dependenciesModule = require('./../lib/dependencies');

test('Test Dependencies class', function(TC) {
  TC.test('Test constructor class', (assert) => {
    const actual = {
      textParagraph: '',
    };

    const expected = new dependenciesModule.Dependencies();
    assert.deepEqual(actual, expected,
      `Should return { textParagraph: '' }`);

    assert.end();
  });

  TC.test('Test generateBadgeDependencies method', async (assert) => {
    const objDependence = {
      '@angular/animations': {
        title: '@angular/animations',
        info: '6.0.2 > 6.0.4',
        color: 'green',
      },
    };

    const badge = new dependenciesModule.Dependencies();
    await badge.generateBadgeDependencies(objDependence);

    const actual = {
      textParagraph: '<svg xmlns="http://www.w3.org/2000/svg" width="216" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="216" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h133v20H0z"/><path fill="#97CA00" d="M133 0h83v20h-83z"/><path fill="url(#b)" d="M0 0h216v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="66.5" y="15" fill="#010101" fill-opacity=".3">@angular/animations</text><text x="66.5" y="14">@angular/animations</text><text x="173.5" y="15" fill="#010101" fill-opacity=".3">6.0.2 &gt; 6.0.4</text><text x="173.5" y="14">6.0.2 &gt; 6.0.4</text></g></svg> ',
    };

    const expected = badge;
    assert.deepEqual(actual, expected,
      `Should return badge`);

    assert.end();
  });

  TC.test('Test generateBadgeDevDependencies method', async (assert) => {
    const objDependence = {
      '@angular/animations': {
        title: '@angular/animations',
        info: '6.0.2 > 6.0.4',
        color: 'green',
      },
    };

    const badge = new dependenciesModule.Dependencies();
    await badge.generateBadgeDevDependencies(objDependence);

    const actual = {
      textParagraph: '<svg xmlns="http://www.w3.org/2000/svg" width="216" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="216" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h133v20H0z"/><path fill="#97CA00" d="M133 0h83v20h-83z"/><path fill="url(#b)" d="M0 0h216v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="66.5" y="15" fill="#010101" fill-opacity=".3">@angular/animations</text><text x="66.5" y="14">@angular/animations</text><text x="173.5" y="15" fill="#010101" fill-opacity=".3">6.0.2 &gt; 6.0.4</text><text x="173.5" y="14">6.0.2 &gt; 6.0.4</text></g></svg> ',
    };

    const expected = badge;
    assert.deepEqual(actual, expected,
      `Should return badge`);

    assert.end();
  });
});

