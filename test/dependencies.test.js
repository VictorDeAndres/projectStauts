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
     textParagraph: '![](./assets/@angular-animations.svg) ',
   };

   const expected = badge;
   assert.deepEqual(actual, expected,
     `Should return link to svg file`);

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
     textParagraph: '![](./assets/@angular-animations.svg) ',
   };

   const expected = badge;
   assert.deepEqual(actual, expected,
     `Should return link to svg file`);

   assert.end();
 });
});
