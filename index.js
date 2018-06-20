const spinner = require('./lib/spinner');
const prerequisites = require('./lib/prerequisites');
const document = require('./lib/document');

(async function() {
 await prerequisites.checkNpmVersion();
 await prerequisites.checkNodeVersion();

 if (!prerequisites.validateImageFolder()) {
   prerequisites.createAssetsFolder();
 }

 // Generate markdown document
 spinner.start(' Generate project status document ');
 if ( document.generateFile() ) {
   document.generateDocument();
 };
 process.stdout.write('\r\n');
})();
