const { exec } = require('child_process')

const load = async (repository, path) =>
  new Promise((resolve, reject) => {
    // TODO make this a lot more flexible.
    const script = `
    git clone --single-branch https://github.com/${repository} ${path}
  `.trim()

    exec(script, (error, stdout, _stderr) => {
      if (error) reject(error)
      else resolve(stdout)
    })
  })

module.exports = load
