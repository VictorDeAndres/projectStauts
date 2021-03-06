const test = require('tape-async');
const github = require('../lib/github');

test('Test github module', function(TC) {
  TC.test('Test is github project', (assert) => {

    const gitHubModule = new github.GitHub();

    const expected = gitHubModule.isGitHubProject('git+https://github.com/VictorDeAndres/projectStauts.git');

    assert.ok(expected,
      `Should return true`);

    assert.end();
  });

  TC.test('Test is not github project', (assert) => {

    const gitHubModule = new github.GitHub();

    const expected = gitHubModule.isGitHubProject('https://testname@bitbucket.org/VictorDeAndres/projectStatus.git');

    assert.notOk(expected,
      `Should return false`);

    assert.end();
  });

  TC.test('Test extract github project name', (assert) => {

    const gitHubModule = new github.GitHub();

    const actual = 'VictorDeAndres/projectStauts';
    const expected = gitHubModule.extractProject('git+https://github.com/VictorDeAndres/projectStauts.git');

    assert.equal(actual, expected,
      `Should return VictorDeAndres/projectStauts`);

    assert.end();
  });

  TC.test('Test generate url to open label issue', (assert) => {

    const gitHubModule = new github.GitHub();

    const actual = 'https://github.com/VictorDeAndres/projectStauts/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement';
    const expected = gitHubModule.urlOpenIssueLabel('enhancement');

    assert.equal(actual, expected,
      `Should return https://github.com/VictorDeAndres/projectStauts/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement`);

    assert.end();
  });

});
