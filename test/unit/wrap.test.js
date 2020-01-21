const { expect } = require('chai')
const proxyquire = require('proxyquire')
const { stub, match } = require('sinon')

describe('src/wrap', () => {
  const promisify = stub().callsFake(fn => fn)
  const rimraf = stub().resolves()
  const loadPlugin = stub()
  const clean = stub()
  const updatePackage = stub()
  const copy = stub()

  const wrap = proxyquire('src/wrap', {
    util: { promisify },
    rimraf,
    './loadPlugin': loadPlugin,
    './loadPlugin/clean': clean,
    './loadPlugin/updatePackage': updatePackage,
    './loadPlugin/copy': copy
  })

  const template = stub()

  const cleanup = () => {
    promisify.resetHistory()
    rimraf.resetHistory()
    template.resetHistory()
    loadPlugin.reset()
    clean.reset()
    updatePackage.reset()
    copy.reset()
  }

  const name = 'test-project'
  const description = 'a test project'
  const version = '0.0.0'

  const swaggerFilePath = 'some-path.yml'
  const swagger = { name, description, version }

  context('when template returns something', () => {
    const repository = 'some/repo'
    const next = stub()

    before(async () => {
      template.resolves({ repository, next })
      const wrapped = wrap(template)
      await wrapped(swagger, swaggerFilePath)
    })

    after(cleanup)

    it('called rimraf', () => {
      expect(rimraf).to.have.been.calledOnce
    })

    it('called the template with the correct data', () => {
      expect(template).to.have.been.calledOnceWith(swagger, swaggerFilePath)
    })

    it('called loadPlugin with the correct details', () => {
      expect(loadPlugin).to.have.been.calledOnceWith(repository, match.string)
    })

    // test it called all the other stuff too.
    // clean
    // updatePackage
    // copy

    it('called next', () => {
      expect(next).to.have.been.calledOnce
    })
  })

  context('when template does not return something', () => {
    const repository = undefined
    const next = undefined

    before(async () => {
      template.resolves({ repository, next })
      const wrapped = wrap(template)
      await wrapped(swagger, swaggerFilePath)
    })

    after(cleanup)

    it('called rimraf', () => {
      expect(rimraf).to.have.been.calledOnce
    })

    it('called the template with the correct data', () => {
      expect(template).to.have.been.calledOnceWith(swagger, swaggerFilePath)
    })

    it('did not call loadPlugin', () => {
      expect(loadPlugin).not.to.have.been.called
    })

    // test it didn't called any of the other stuff.
  })
})
