const test = require('tape-async');
const documentStatus = require('./../lib/documentStatus');

test('Test documentStatus class', function(TC) {
  TC.test('Test constructor class', (assert) => {
    const actual = {
      textParagraph: '',
    };
    const expected = new documentStatus();

    assert.deepEqual(actual, expected,
      `Should return { textParagraph: '' }`);

    assert.end();
  });

  TC.test('Test returnCarrige method', (assert) => {
    const actual = {
      textParagraph: '\r\n',
    };
    const expected = new documentStatus();
    expected.returnCarrige();

    assert.deepEqual(actual, expected,
      `Should return { textParagraph: ' r n' }`);

    assert.end();
  });

  TC.test('Test title method', (assert) => {
    const actual = {
      textParagraph: '## Test Title\r\n',
    };
    const expected = new documentStatus();
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
    const expected = new documentStatus();
    expected.title = 'Test SubTitle';
    expected.subTitle;

    assert.deepEqual(actual, expected,
      `Should return { textParagraph: '## Test SubTitle' }`);

    assert.end();
  });

  TC.test('Test miniSubTitle method', (assert) => {
    const actual = {
      textParagraph: '#### Test SubTitle\r\n',
    };
    const expected = new documentStatus();
    expected.miniSubTitle = 'Test SubTitle';
    expected.miniSubTitle;

    assert.deepEqual(actual, expected,
      `Should return { textParagraph: '## Test SubTitle' }`);

    assert.end();
  });

  TC.test('Test paragraph method', (assert) => {
    const actual = {
      textParagraph: 'Test paragraph\r\n',
    };
    const expected = new documentStatus();
    expected.paragraph = 'Test paragraph';
    expected.paragraph;

    assert.deepEqual(actual, expected,
      `Should return { textParagraph: '## Test paragraph' }`);

    assert.end();
  });

  TC.test('Test standardBadge method', async (assert) => {
    const DocumentStatus = new documentStatus();
    await DocumentStatus.standardBadge({
      title: 'version',
      info: '1.0.0',
      color: 'blue',
    });

    const actual = {
      textParagraph: '![](./assets/version.svg) ',
    };
    const expected = DocumentStatus;

    assert.deepEqual(actual, expected,
      `Should return svg badge`);

    assert.end();
  });
});

