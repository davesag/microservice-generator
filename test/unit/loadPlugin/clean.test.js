const { expect } = require('chai')
const proxyquire = require('proxyquire')
const { stub } = require('sinon')

describe('src/loadPlugin/clean', () => {
  const rimraf = stub()
  const buildFolder = './test/build'

  const clean = proxyquire('src/loadPlugin/clean', {
    rimraf
  })

  const cleanup = () => {
    rimraf.reset()
  }

  context('when it works', () => {
    before(async () => {
      rimraf.callsFake((_path, fn) => {
        fn()
      })
      await clean(buildFolder)
    })

    after(cleanup)

    it('called rimraf four times', () => {
      expect(rimraf.callCount).to.equal(3)
    })
  })

  context('when it does not work', () => {
    let error

    before(async () => {
      rimraf.callsFake((path, fn) => {
        fn(new Error(path))
      })
      try {
        await clean(buildFolder)
      } catch (err) {
        error = err
      }
    })

    after(cleanup)

    it('called rimraf', () => {
      expect(rimraf).to.have.been.called
    })

    it('returned an error', () => {
      expect(error).to.be.an.instanceOf(Error)
    })
  })
})
