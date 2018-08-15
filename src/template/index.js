const path = require('path')
const traverse = require('traverse-folders')

const pathSeparator = new RegExp(path.sep, 'g')

const templates = {}

const processor = file => {
  const name = file.slice(__dirname.length + 1, -3)
  const template = require(file)
  templates[name] = template
}

traverse(__dirname, processor)

module.exports = templates
