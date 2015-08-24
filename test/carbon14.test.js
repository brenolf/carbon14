var carbon14 = require('../lib/carbon14')
var chaiAsPromised = require('chai-as-promised')
var sinon = require('sinon')
var fs = require('fs')
var chai = require('chai')
var rp = require('request-promise');
var expect = chai.expect

chai.use(chaiAsPromised);

describe('carbon14', function () {
  var html = fs.readFileSync(__dirname + '/fixtures/godofwar.html', 'utf-8')

  var fakeResponse = new Promise(function (fulfill) {
    fulfill(html);
  });

  before(function () {
    sinon
      .stub(rp, 'post')
      .returns(fakeResponse);
  })

  after(function () {
    rp.post.restore()
  })

  context('when no game name is given', function () {
    it('throws an error', function () {
      expect(function () { carbon14() }).to.throw
    })
  })

  context('when a game name is given', function () {
    it('return a promise with the formated json', function () {
      return expect(carbon14('god of war')).to.eventually.have.length(4)
    })
  })
})
