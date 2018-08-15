const mockSwaggerFile = {
  info: {
    description: 'test',
    version: '1',
    title: 'this is a test'
  },
  basePath: '/api',
  paths: {
    '/': 'some root path info'
  },
  definitions: {
    Test: 'some test info'
  }
}

module.exports = mockSwaggerFile
