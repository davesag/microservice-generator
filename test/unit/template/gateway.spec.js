const { expect } = require('chai')
const { gateway } = require('src/template')

const mockSwaggerFile = require('test/utils/mockSwaggerFile')

describe('src/template/gateway', () => {
  before(async () => {
    await gateway(mockSwaggerFile)
  })

  it('did stuff', () => {
    expect(true).to.be.true
  })
})
