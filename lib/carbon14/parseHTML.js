/*
 * Carbon14
 * Copyright(c) 2015 Breno Lima de Freitas <brenolimadefreitas@gmail.com>
 * MIT Licensed
 */

var parse = require('xml-parser');

var DICTIONARY = {
  'Main Story': 'main',
  'Main + Extra': 'extra',
  'Completionist': 'completionist',
  'Combined': 'combined',
  'Solo': 'solo',
  'Co-Op': 'coop',
  'Vs.': 'vs'
};

module.exports = function (html) {
  if (html === undefined) {
    throw new TypeError('No string given');
  }

  var json = parse('<root>' + html + '</root>');

  var list = json.root.children.slice(1);
  var length = list.length;

  var result = [];

  for (var i = 0; i < length; i++) {
    var nodes = {
      title: list[i].children[1].children[0].children[0],
      details: list[i].children[1].children[1].children
    };

    var nDetails = nodes.details.length;

    var game = {};

    var invalidCategory = false;

    for (var j = 0; j < nDetails; j++) {
      var entry = nodes.details[j].children;

      var category = DICTIONARY[entry[0].content];

      if (!category) {
        invalidCategory = true;
        break;
      }

      var time = entry[1].content
                          .split(' ')[0]
                          .replace('&#188;', '.25')
                          .replace('&#189;', '.5')
                          .replace('&#190;', '.75')
                          .replace(/[^\d\.]/g, '');

      if (time) {
        game[category] = parseFloat(time);
      }
    }

    if (invalidCategory) {
      continue;
    }

    game.name = nodes.title.content;

    result.push(game);
  }

  return result;
};
