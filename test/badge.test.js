const test = require('tape-async');
const badge = require('./../lib/badge');

test('Test badge module', function(TC) {
  TC.test('Test generate badge', async (assert) => {
    const testBadge = {
      'title': 'version',
      'info': '1.0.0.',
      'color': 'blue',
    };
    const actual = '<svg xmlns="http://www.w3.org/2000/svg" width="95" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="95" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h52v20H0z"/><path fill="#007EC6" d="M52 0h43v20H52z"/><path fill="url(#b)" d="M0 0h95v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="26" y="15" fill="#010101" fill-opacity=".3">version</text><text x="26" y="14">version</text><text x="72.5" y="15" fill="#010101" fill-opacity=".3">1.0.0.</text><text x="72.5" y="14">1.0.0.</text></g></svg>';
    const expected = await badge(testBadge);

    assert.equal(actual, expected,
      `Should return svg graph`);

    assert.end();
  });
});
