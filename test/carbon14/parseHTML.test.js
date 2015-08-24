var parseHTML = require('../../lib/carbon14/parseHTML')
var expect = require('chai').expect
var fs = require('fs')

describe('parseHTML', function () {
  var html = fs.readFileSync(__dirname + '/../fixtures/godofwar.html', 'utf-8')

  var json = require(__dirname + '/../fixtures/godofwar.json')

  var invalid = "<li class='global_padding back_white shadow_box'>No results \
  for <strong>there should be no game with this title</strong> in \
  <u>games</u>.</li>"

  context('when there is no input string', function () {
    it('throws an error', function () {
      expect(function () { parseHTML() }).to.throw
    })
  })

  context('when there is a html input', function () {
    context('when there are no games in the list', function () {
      it('returns an empty array', function () {
        expect(parseHTML(invalid)).to.be.empty
      })
    })

    context('when the string is an actual list of games', function () {
      it('returns a formated list of the games found', function () {
        expect(parseHTML(html)).to.eql(json)
      })
    })
  })
})
