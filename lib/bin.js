#!/usr/bin/env node

var carbon14 = require('./carbon14');
var colors = require('colors');

var gameName = process.argv.slice(2).join(' ');

if (gameName === '') {
  throw new Error('usage: carbon14 <game-name>');
}

var handler = function (response) {
  var length = response.length;

  if (length === 0) {
    console.log(('No games found matching "' + gameName + '"').red);
    return;
  }

  console.log((length + ' game(s) found matching "' + gameName + '"\n').blue);

  for (var i = 0; i < length; i++) {
    var game = response[i];

    console.log(game.name.yellow);

    for (var entry in game) {
      if (entry !== 'name') {
        console.log('\t' + entry.green + ': ' + game[entry]);
      }
    }

    console.log();
  }
};

carbon14(gameName).then(handler);
