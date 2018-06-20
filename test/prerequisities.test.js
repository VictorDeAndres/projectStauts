const test = require('tape-async');
const prerequisites = require('../lib/prerequisites');

test('Test prerequisites', (TC) => {
 TC.test('Test exist assets folder', async (assert) => {
   const expected = prerequisites.validateImageFolder();

   assert.ok(expected,
     `Should return true`);

   assert.end();
 });
});
