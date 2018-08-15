const { expect } = require('chai')

const extract = require('src/extractFromSwagger')

const mockSwaggerFile = require('test/utils/mockSwaggerFile')

describe('src/extractFromSwagger', () => {
  const expected = {
    description: 'test',
    version: '1',
    name: 'this is a test',
    basePath: '/api',
    paths: {
      '/': 'some root path info'
    },
    definitions: {
      Test: 'some test info'
    }
  }

  let result

  before(async () => {
    result = extract(mockSwaggerFile)
  })

  it('extracted the right data', () => {
    expect(result).to.deep.equal(expected)
  })
})
