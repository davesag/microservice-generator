const { expect } = require('chai')
const proxyquire = require('proxyquire')
const { stub, match } = require('sinon')

const mockSwaggerFile = require('test/utils/mockSwaggerFile')

describe('src/template/gateway', () => {
  const wrap = stub().callsFake(f => f)
  const gateway = proxyquire('src/template/gateway', {
    '../wrap': wrap
  })
  const repository = undefined

  let result

  before(async () => {
    result = await gateway(mockSwaggerFile, 'gateway.yml')
    result.next()
  })

  it('called wrap with the correct details', () => {
    expect(wrap).to.have.been.calledWith(match.func)
  })

  it('returned the correct result', () => {
    expect(result).to.have.property('repository', repository)
    expect(result).to.have.property('next')
  })
})
