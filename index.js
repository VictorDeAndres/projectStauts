const semver = require('semver');
const chalk = require('chalk');

const spinner = require('./lib/spinner');
const executeCommand = require('./lib/executeCommand');
const document = require('./lib/document');

module.exports = async () => {
  // Check npm version
  process.stdout.write(chalk.blue('     Check npm version: '));
  const npmVersion = await executeCommand('npm -v');
  const currentNPMVersion = semver.coerce(npmVersion.stdout).version;
  if ( !npmVersion.error && semver.gt(currentNPMVersion, '6.0.0')) {
    process.stdout.write(currentNPMVersion);
    process.stdout.write(chalk.green(' [OK]'));
    process.stdout.write('\r\n');
  } else {
    process.stdout.write(currentNPMVersion);
    process.stdout.write(chalk.red(' [Error]'));
    process.stdout.write('\r\n');
    process.exit(1);
  }

  // Check node version
  const nodeVersion = await executeCommand('node -v');
  process.stdout.write(chalk.blue('     Check node version: '));
  const currentNodeVersion = semver.coerce(nodeVersion.stdout).version;
  if ( !nodeVersion.error && semver.gt(currentNodeVersion, '7.6.1') ) {
    process.stdout.write(currentNodeVersion);
    process.stdout.write(chalk.green(' [OK]'));
    process.stdout.write('\r\n');
  } else {
    process.stdout.write(currentNodeVersion);
    process.stdout.write(chalk.red(' [Error]'));
    process.stdout.write('\r\n');
    process.exit(1);
  }

  // // Generate markdown document
  process.stdout.write('\r\n');
  spinner.start(' Generate project status document ');
  // process.stdout.write(chalk.blue('Generate project status document '));
  if ( document.generateFile() ) {
    document.generateDocument();
  };
};


