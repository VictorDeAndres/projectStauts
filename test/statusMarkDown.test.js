const test = require('tape-async');
const StatusMarkDown = require('./../lib/statusMarkDown');

test('Test StatusMarkDown class', function(TC) {
  TC.test('Test constructor class', (assert) => {
    const actual = {
      textParagraph: '',
    };
    const expected = new StatusMarkDown();

    assert.deepEqual(actual, expected,
      `Should return { textParagraph: '' }`);

    assert.end();
  });

  TC.test('Test returnCarrige method', (assert) => {
    const actual = {
      textParagraph: '\r\n',
    };
    const expected = new StatusMarkDown();
    expected.returnCarrige();

    assert.deepEqual(actual, expected,
      `Should return { textParagraph: ' r n' }`);

    assert.end();
  });

  TC.test('Test title method', (assert) => {
    const actual = {
      textParagraph: '## Test Title\r\n',
    };
    const expected = new StatusMarkDown();
    expected.title = 'Test Title';
    expected.title;

    assert.deepEqual(actual, expected,
      `Should return { textParagraph: '## Test Title' }`);

    assert.end();
  });

  TC.test('Test subTitle method', (assert) => {
    const actual = {
      textParagraph: '## Test SubTitle\r\n',
    };
    const expected = new StatusMarkDown();
    expected.title = 'Test SubTitle';
    expected.subTitle;

    assert.deepEqual(actual, expected,
      `Should return { textParagraph: '## Test SubTitle' }`);

    assert.end();
  });

  TC.test('Test paragraph method', (assert) => {
    const actual = {
      textParagraph: 'Test paragraph\r\n',
    };
    const expected = new StatusMarkDown();
    expected.paragraph = 'Test paragraph';
    expected.paragraph;

    assert.deepEqual(actual, expected,
      `Should return { textParagraph: '## Test paragraph' }`);

    assert.end();
  });

  TC.test('Test standardBadge method', async (assert) => {
    const statusMarkDown = new StatusMarkDown();
    await statusMarkDown.standardBadge({
      title: 'version',
      info: '1.0.0',
      color: 'blue',
    });

    const actual = {
      textParagraph: '<svg xmlns="http://www.w3.org/2000/svg" width="91" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="91" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h52v20H0z"/><path fill="#007EC6" d="M52 0h39v20H52z"/><path fill="url(#b)" d="M0 0h91v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="26" y="15" fill="#010101" fill-opacity=".3">version</text><text x="26" y="14">version</text><text x="70.5" y="15" fill="#010101" fill-opacity=".3">1.0.0</text><text x="70.5" y="14">1.0.0</text></g></svg> ',
    };
    const expected = statusMarkDown;

    assert.deepEqual(actual, expected,
      `Should return svg badge`);

    assert.end();
  });
});

