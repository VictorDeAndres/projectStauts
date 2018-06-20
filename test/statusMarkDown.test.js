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
      textParagraph: '![](./assets/version.svg) ',
    };
    const expected = statusMarkDown;

    assert.deepEqual(actual, expected,
      `Should return svg badge`);

    assert.end();
  });
});

