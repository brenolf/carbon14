/*
 * Carbon14
 * Copyright(c) 2015 Breno Lima de Freitas <brenolimadefreitas@gmail.com>
 * MIT Licensed
 */

'use strict';

var rp = require('request-promise');
var parseHTML = require('./carbon14/parseHTML');

module.exports = function (name) {
  if (typeof name !== 'string') {
    throw new TypeError('No game given');
  }

  var options = {
    'queryString': name,
    't': 'games',
    'sorthead': 'popular',
    'sortd': 'Normal Order',
    'detail': 0
  };

  return rp
    .post('http://howlongtobeat.com/search_main.php', { form: options })
    .then(parseHTML);
};
