const { promisify } = require('util')
const rimrafCb = require('rimraf')
const path = require('path')
const loadPlugin = require('./loadPlugin')
const clean = require('./loadPlugin/clean')
const updatePackage = require('./loadPlugin/updatePackage')
const copy = require('./loadPlugin/copy')

/* istanbul ignore next */
const returnUndefined = () => undefined

const wrap = template => async ({ name, description, version, ..._swagger }, swaggerFilePath) => {
  const buildFolder = path.join(process.cwd(), 'build')
  const rimraf = promisify(rimrafCb)

  await rimraf(buildFolder)
  console.log('cleared build folder', buildFolder)

  const { repository, next = returnUndefined } = await template(
    { name, description, version, ..._swagger },
    swaggerFilePath
  )

  if (!repository) {
    console.log('No repository found for', name)
    return
  }

  await loadPlugin(repository, buildFolder)
  await clean(buildFolder)
  await updatePackage(buildFolder, { repository, name, description, version })
  await copy(swaggerFilePath, path.join(buildFolder, 'api.yml'))
  // generate paths
  // generate definitions
  return next()
}

module.exports = wrap
