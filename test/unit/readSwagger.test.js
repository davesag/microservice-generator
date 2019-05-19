const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const mockSwaggerFile = require('test/utils/mockSwaggerFile')

describe('src/readSwagger', () => {
  const mockYAML = { load: sinon.stub() }
  const readSwagger = proxyquire('src/readSwagger', {
    yamljs: mockYAML
  })
  const yamlPath = 'some/path'

  let result

  before(() => {
    mockYAML.load.returns(mockSwaggerFile)
    result = readSwagger(yamlPath)
  })

  after(() => {
    sinon.restore()
  })

  it('called YAML.load with the right data', () => {
    expect(mockYAML.load).to.have.been.calledWith(yamlPath)
  })

  it('returns the expected result', () => {
    expect(result).to.deep.equal(mockSwaggerFile)
  })
})
