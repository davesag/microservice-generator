const rimraf = require('rimraf')
const path = require('path')

const clean = async buildFolder => {
  const promises = ['.git', '.github', 'package-lock.json'].map(
    route =>
      new Promise((resolve, reject) => {
        const pathToClean = path.join(buildFolder, route)

        rimraf(pathToClean, err => {
          if (err) reject(err)
          else {
            console.log('deleted', pathToClean)
            resolve()
          }
        })
      })
  )
  await Promise.all(promises)
}

module.exports = clean
