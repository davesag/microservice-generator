const { expect } = require('chai')
const template = require('src/template')

describe('src/template/index', () => {
  const doTest = name => {
    it(`${name} is a template`, () => {
      expect(template[name]).to.be.a('function')
    })
  }
  ;['api', 'gateway', 'microservice'].forEach(doTest)
})
