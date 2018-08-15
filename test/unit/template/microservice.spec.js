const { expect } = require('chai')
const { microservice } = require('src/template')

const mockSwaggerFile = require('test/utils/mockSwaggerFile')

describe('src/template/microservice', () => {
  before(async () => {
    await microservice(mockSwaggerFile)
  })

  it('did stuff', () => {
    expect(true).to.be.true
  })
})
