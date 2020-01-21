const slugify = require('slugify')

const makeSlug = string => slugify(string, { lower: true })

module.exports = makeSlug
