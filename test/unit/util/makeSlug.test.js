const { expect } = require('chai')
const proxyquire = require('proxyquire')
const { stub } = require('sinon')

describe('src/utils/makeSlug', () => {
  const slugify = stub().callsFake(str => str)

  const makeSlug = proxyquire('src/utils/makeSlug', {
    slugify
  })

  const string = 'some string'
  let result

  before(() => {
    result = makeSlug(string)
  })

  it('called slugify with the string and { lower: true }', () => {
    expect(slugify).to.have.been.calledOnceWith(string, { lower: true })
  })

  it('returned the expected result', () => {
    expect(result).to.equal(string)
  })
})
