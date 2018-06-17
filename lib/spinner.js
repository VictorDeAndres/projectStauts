'use strict';

let sprintf = require('util').format;
let timer;

/**
 * Add two numbers.
 * @param {array} arr
 * @param {number} interval
 */
function play(arr, interval) {
  let len = arr.length;
  let i = 0;

  interval = interval || 100;

  timer = setInterval(function() {
    let str = arr[i++ % len];
    process.stdout.write('\u001b[0G' + str);
  }, interval);
};


let spinner = 'win32' == process.platform
    ? ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    : ['◜', '◠', '◝', '◞', '◡', '◟'];

exports.start = function(msg) {
  msg = msg || '';
  let frames = spinner.map(function(c) {
      return sprintf('  \u001b[93m%s \u001b[34m'+msg+'\u001b[0m', c);
  });
  play(frames);
};

exports.stop = function() {
  if (timer) {
    clearInterval(timer);
    timer=null;
  }
};
