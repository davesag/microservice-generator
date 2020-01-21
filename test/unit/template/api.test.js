const { expect } = require('chai')
const proxyquire = require('proxyquire')
const { stub, match } = require('sinon')

const mockSwaggerFile = require('test/utils/mockSwaggerFile')

describe('src/template/api', () => {
  const wrap = stub().callsFake(f => f)
  const api = proxyquire('src/template/api', {
    '../wrap': wrap
  })
  const repository = 'davesag/api-server-boilerplate'

  let result

  before(async () => {
    result = await api(mockSwaggerFile, 'api.yml')
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
