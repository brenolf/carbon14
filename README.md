# Carbon14 [![Build Status](https://travis-ci.org/brenolf/carbon14.svg)](https://travis-ci.org/brenolf/carbon14) [![npm version](https://badge.fury.io/js/carbon14.svg)](http://badge.fury.io/js/carbon14)
> Checks how long it takes to beat a given game

Carbon14 is a utility to check how long one needs to beat a game. It uses [HowLongToBeat](http://howlongtobeat.com/) data.

![Carbon14](https://raw.githubusercontent.com/brenolf/carbon14/master/preview.gif "Carbon14")

## Install

`$ npm install --save carbon14`

## Usage

```js
var carbon14 = require('carbon14');

carbon14('apotheon')
  .then(console.log);
```

## CLI

If installed globally, you can use Carbon14 as a command line utility as follows:

`$ carbon14 apotheon`

## Format

Carbon14 returns a promise that, when fulfilled, returns a json containing the available data in a very minimalistic flavour. Note that it omits the unavailable playing times. An example of the object returned is shown below.

```json
[
  {
    "name": "God of War",
    "main": 9,
    "extra": 9.25,
    "completionist": 9.5,
    "combined": 9.75
  },
  {
    "name": "God of War: Origins Collection",
    "solo": 11.5
  }
]
```

## License

MIT
