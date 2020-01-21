const { expect } = require('chai')
const proxyquire = require('proxyquire')
const { stub } = require('sinon')

describe('src/loadPlugin/copy', () => {
  const copyFile = stub()
  const src = './api.yml'
  const dest = './test/build/api.yml'
  const promisify = stub().returns(copyFile)

  const copy = proxyquire('src/loadPlugin/copy', {
    util: { promisify }
  })

  before(async () => {
    await copy(src, dest)
  })

  it('called copyFile with the src and dest parameters', () => {
    expect(copyFile).to.have.been.calledOnceWith(src, dest)
  })
})
