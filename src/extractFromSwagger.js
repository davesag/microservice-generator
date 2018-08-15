const extract = ({
  info: { title: name, description, version },
  basePath,
  paths,
  definitions
}) => ({ name, description, version, basePath, paths, definitions })

module.exports = extract
