
# Project Status
<svg xmlns="http://www.w3.org/2000/svg" width="91" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="91" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h52v20H0z"/><path fill="#007EC6" d="M52 0h39v20H52z"/><path fill="url(#b)" d="M0 0h91v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="26" y="15" fill="#010101" fill-opacity=".3">version</text><text x="26" y="14">version</text><text x="70.5" y="15" fill="#010101" fill-opacity=".3">0.1.0</text><text x="70.5" y="14">0.1.0</text></g></svg> <svg xmlns="http://www.w3.org/2000/svg" width="83" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="83" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h51v20H0z"/><path fill="#007EC6" d="M51 0h32v20H51z"/><path fill="url(#b)" d="M0 0h83v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="25.5" y="15" fill="#010101" fill-opacity=".3">license</text><text x="25.5" y="14">license</text><text x="66" y="15" fill="#010101" fill-opacity=".3">MIT</text><text x="66" y="14">MIT</text></g></svg> 

Generate a status report of your projects automatically, know the status of your dependencies and development dependencies. You know what are the dependencies that you must update. You know which dependencies you can update without risk, and what updates can make your project not work correctly.

Perform an audit to know exactly the status of all your modules.

## [](https://github.com/VictorDeAndres/projectStauts#prerequisites)Prerequisites

At least it's necessary you have install

 - Node version 7.6.1 

 - Npm version 6.0.0

## [](https://github.com/VictorDeAndres/projectStauts#installation)Installation

Install project-status as a development dependency:

    npm install --save-dev project-status

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

  

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).