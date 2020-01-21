const wrap = require('../wrap')

const generator = async (_swagger, _swaggerFilePath) => {
  // anything else you want to do with the swagger doc details.
  const repository = 'davesag/api-server-boilerplate'
  const next = () => {
    console.log('created api from', repository)
  }
  return { repository, next }
}

module.exports = wrap(generator)
