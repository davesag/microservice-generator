const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { userInfo } = require('os')

const makeSlug = require('../utils/makeSlug')

const updatePackage = async (buildFolder, { repository, name: rawName, description, version }) => {
  const readFile = promisify(fs.readFile)
  const writeFile = promisify(fs.writeFile)
  const { username } = userInfo()

  const packageFile = path.join(buildFolder, 'package.json')
  const packageData = await readFile(packageFile)

  const name = `${makeSlug(username)}/${makeSlug(rawName)}`
  const regex = new RegExp(`@?${repository}`, 'g')
  const packageString = packageData.toString().replace(regex, name)

  const { funding: _funding, private: _private, ...basePackage } = JSON.parse(packageString)
  const pkg = {
    ...basePackage,
    description,
    version,
    name
  }

  console.log('rewriting package.json')

  await writeFile(packageFile, JSON.stringify(pkg, null, 2))
}

module.exports = updatePackage
