const { expect } = require('chai')
const proxyquire = require('proxyquire')
const { stub, match } = require('sinon')

describe('src/loadPlugin', () => {
  const exec = stub() // .callsFake((script, fn) => fn(error))
  const childProcess = { exec }
  const loadPlugin = proxyquire('src/loadPlugin', {
    child_process: childProcess
  })
  const repository = 'some/git-repo'
  const path = '.'
  const expected = `git clone --single-branch https://github.com/${repository} ${path}`

  const cleanup = () => {
    exec.reset()
  }

  context('when the git command works', () => {
    let result

    before(async () => {
      exec.callsFake((script, fn) => fn(null, script))
      result = await loadPlugin(repository, path)
    })

    after(cleanup)

    it('called exec', () => {
      expect(exec).to.have.been.calledOnceWith(expected, match.func)
    })

    it('returned the script', () => {
      expect(result).to.equal(expected)
    })
  })

  context('when the git command does not work', () => {
    let error

    before(async () => {
      exec.callsFake((script, fn) => fn(script))
      try {
        await loadPlugin(repository, path)
      } catch (err) {
        error = err
      }
    })

    after(cleanup)

    it('called exec', () => {
      expect(exec).to.have.been.calledOnceWith(expected, match.func)
    })

    it('threw an error', () => {
      expect(error).to.equal(expected)
    })
  })
})
