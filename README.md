
# Project Status
![](./assets/version.svg) ![](./assets/license.svg) 

Generate a status report of your projects automatically, know the status of your dependencies and development dependencies. You know what are the dependencies that you must update. You know which dependencies you can update without risk, and what updates can make your project not work correctly.

Perform an audit to know exactly the status of all your modules.

## [](https://github.com/VictorDeAndres/projectStauts#prerequisites)Prerequisites

At least it's necessary you have install

 - Node version 7.6.1 

 - Npm version 6.0.0

## [](https://github.com/VictorDeAndres/projectStauts#installation)Installation

Install project-status as a development dependency:

    npm install --save-dev project-status

or a global package

    npm install -g project-status

## [](https://github.com/VictorDeAndres/projectStauts#usage)Usage

    $ status

This command will generated a new file, STATUS.md, in your root directory with all the infomation about your project.

## [](https://github.com/VictorDeAndres/projectStauts#example)Example
![](/assets/example.png)

## [](https://github.com/VictorDeAndres/projectStauts#test)Tests

    npm test
    node ./test/*.test.js | tap-spec

## [](https://github.com/VictorDeAndres/projectStauts#author)Author
Victor de Andrés

 - Blog: https://victordeandres.es
 - Github: https://github.com/VictorDeAndres

## [](https://github.com/VictorDeAndres/projectStauts#license)License

  
node .bin/status --user victor.deandres@gmail.com --password 4ZYScZ43b96L
Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).