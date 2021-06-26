const wrap = require('../wrap')

const generator = async (_swagger, _swaggerFilePath) => {
  const repository = undefined

  // anything else you want to do with the swagger doc details.
  const next = () => {
    console.log('service repository not implemented')
    // generate boilerplate
    // generate paths
    // generate definitions
  }
  return { repository, next }
}

module.exports = wrap(generator)
