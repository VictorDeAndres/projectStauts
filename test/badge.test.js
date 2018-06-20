const test = require('tape-async');
const badge = require('./../lib/badge');

test('Test badge module', function(TC) {
  TC.test('Test generate badge', async (assert) => {
    const testBadge = {
      'title': 'version',
      'info': '1.0.0.',
      'color': 'blue',
    };

    const actual = '![](./assets/version.svg)';
    const expected = await badge(testBadge);

    assert.equal(actual, expected,
      `Should return svg graph`);

    assert.end();
  });
});
