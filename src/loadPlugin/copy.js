const fs = require('fs')
const { promisify } = require('util')

const copy = async (src, dest) => {
  console.log('copy', src, 'to', dest)
  const copyFile = promisify(fs.copyFile)
  return copyFile(src, dest)
}

module.exports = copy
