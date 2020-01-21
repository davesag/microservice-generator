const { expect } = require('chai')
const proxyquire = require('proxyquire')
const { stub } = require('sinon')

describe('src/loadPlugin/updatePackage', () => {
  const readFile = stub()
  const writeFile = stub()
  const buildFolder = './test/build'
  const repository = 'test/test'
  const name = 'ms-testy'
  const description = 'a description'
  const version = '0.0.0'

  const promisify = stub().callsFake(fn => fn)
  const makeSlug = stub().callsFake(str => str)

  const userInfo = stub().returns({ username: 'test-user' })

  const updatePackage = proxyquire('src/loadPlugin/updatePackage', {
    fs: { readFile, writeFile },
    util: { promisify },
    os: { userInfo },
    '../utils/makeSlug': makeSlug
  })

  const cleanup = () => {
    readFile.reset()
    writeFile.reset()
    promisify.resetHistory()
    userInfo.resetHistory()
    makeSlug.resetHistory()
  }

  const packageData = JSON.stringify({ some: 'data' })

  context('when it works', () => {
    before(async () => {
      readFile.resolves(packageData)
      writeFile.resolves()
      await updatePackage(buildFolder, {
        repository,
        name,
        description,
        version
      })
    })

    after(cleanup)

    it('called readfile', () => {
      expect(readFile).to.have.been.calledOnce
    })

    it('called writefile', () => {
      expect(writeFile).to.have.been.calledOnce
    })
  })
})
