const { exec } = require('child_process')

const load = async (repository, path) =>
  new Promise((resolve, reject) => {
    // TODO use the GitHub API and node-fetch instead.
    const script = `
    git clone --single-branch https://github.com/${repository} ${path}
  `.trim()

    exec(script, (error, stdout, _stderr) => {
      if (error) reject(error)
      else resolve(stdout)
    })
  })

module.exports = load
