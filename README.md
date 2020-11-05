# microservice-generator

An opinionated generator for Swagger based Rest API servers

## Prerequisites

This library assumes:

1. You are using NodeJS 12.18.2+

## Install

**Note**: This project is currently in development and _not_ ready to be installed.

## Run (_proposed command-line interface_)

    ms-new path/to/api.yml [--gateway --api --output path/to/output/dir]

This will read your swagger formatted api.yml file and do the following

1. Generate boilerplate

   - `package.json` file,
   - various dotfiles,
   - a `CONTRIBUTING.md` file,
   - a `README.md` file
   - a `.circleci/config.yml` file
   - a `src` folder as described below,
   - a `test` folder as described below

2. Generate Project source

   ```
   src/
     api/
       index.js
       ping.js
       versions.js
     events/
       registerService.js
     models/
       index.js
     serialisers/
     utils/
       apiValidator.js
       appMaker.js
       config.js
       genericErrors.js
       handleMigrationError.js
       logger.js
       makeUri.js
       messageMaker.js
       uptime.js
     errors.js
     exchange.js
     index.js
     server.js
     service.js
   ```

3. Generate Tests

   ```
   test/
     db/
       models/
       _.spec.js
       test_helper.js
     server/
       routes/
       _.spec.js
       test_helper.js
     unit/
       api/
       events/
       models/
       serialisers/
       utils/
         apiValidator.spec.js
         appMaker.spec.js
         genericErrors.spec.js
         handleMigrationError.spec.js
         makeUri.spec.js
         messageMaker.spec.js
         uptime.spec.js
       server.spec.js
       service.spec.js
       test_helper.js
       utils/
         data/
           index.js
         eventTest.js
         mockApi.js
         mockLogger.js
         mockSerialiser.js
         mockService.js
     .eslintrc.js
   ```

4. Generate supporting files and dotfiles

   ```
   config/
     db_config.yml
   migrations/
   tasks/
     generateERD/
       index.js
     initDb/
       index.js
     migrationConfig.js
   .circleci/
     config.yml
   .eslintrc.js
   .eslintignore
   .gitignore
   .prettiergnore
   .sequelizerc
   api.yml
   CONTRIBUTING.md
   Dockerfile
   docker-compose.yml
   index.js
   Procfile
   ```

5. For each path extract the `path` details and the corresponding `operationId` and generate the following

   ```
   src/api/{basename}/
     {operationId}.js // folder paths are generated as required
   test/unit/api/{basename}
     {operationId}.spec.js
   test/server/routes/{basename}
     {operationId}.spec.js
   ```

6. For each definition in the `definitions` section

   ```
   migrations/
     {timestamp}-create-{plural(definition)}.js
   src/models/
     {definition}.js
   test/unit/models/
     {definition}.spec.js
   test/db/models/
     {definition}.spec.js
   test/utils/data/
   {definition}Data.js
     make{operationId}.js
   ```

Once these files have been generated, you can then start filling in whatever implementation details you wish. Where possible the generator will fill in complete code. Where not possible it will generate working stubs and some documentation to get you going.

### Parameters and Options

`ms-new` takes the following parameters

- The path to a swagger YAML file.
- `--gateway` Tells the generator you are generating an api gateway, not an underlying service.
- `--output path/to/output/dir` Tells the generator which folder to write files to. Note that folder must be empty apart from the following files or directories which will be ignored.

  ```
  .git/
  .gitignore
  LICENCE
  README.md
  {api.yml} // whatever name you specified when you invoked the generator
  ```

## Once you have generated a server

`cd` into your server folder if you need to, then

```
npm install
npm test
npm run backend
npm run test:db
npm run test:server
npm start
```

The service's tests should all pass and it should run, it should expose an api, and, if it's a microservice it should emit a `heartbeat` event to rabbitmq.

If it's a `gateway` service then it will listen for `heartbeat` events and keep track of the services and their access tokens.

It will expose the rest api outlined in the swagger documentation and link those paths to their nominated routes. These routes will simply emit example data.

## Now write some code

### Models

Overwrite the generated tests and source models to suit your own needs.

### Route Controllers

The default route controller will be an async function that includes code to read any of the params defined, and to emit the relevant errors or response. The specifics of how the response is generated are left to you.

Controllers for the `ping` and `versions` root level functions common to all servers are installed along with their corresponding unit and integration tests.

### Services

Service definition is not covered in the swagger file, so we leave this blank apart from the default heartbeat service

### Migrations

The default migrations are certain to be lacking some subtlety.

## Development

You may add environment variables to your local `.env` file

### Branches

<!-- prettier-ignore -->
| Branch | Tests | Code Coverage | Audit | Comments |
| ------ | ----- | ------------- | ----- | -------- |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/microservice-generator/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/microservice-generator/tree/develop) | [![codecov](https://codecov.io/gh/davesag/microservice-generator/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/microservice-generator) | [![Vulnerabilities](https://snyk.io/test/github/davesag/microservice-generator/develop/badge.svg)](https://snyk.io/test/github/davesag/microservice-generator/develop) | Work in progress |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/microservice-generator/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/microservice-generator/tree/master) | [![codecov](https://codecov.io/gh/davesag/microservice-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/microservice-generator) | [![Vulnerabilities](https://snyk.io/test/github/davesag/microservice-generator/master/badge.svg)](https://snyk.io/test/github/davesag/microservice-generator/master) | Latest stable release |

### Prerequisites

- [NodeJS](htps://nodejs.org), 15.0.1+ (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.) You must use npm version 7.0.8 or better.
- [Docker](https://www.docker.com) (if on a Mac then use [Docker for Mac](https://docs.docker.com/docker-for-mac/), not the homebrew version)

### Initialisation

    npm install

### Starting the server and syncing the database with the model definitions.

Before you run the server you will need to set up the database.

    npm run db:init

then

    npm run db:migrate

then you can

    npm start

### Test it

- `npm test` — runs the unit tests (quick)

### Lint it

    npm run lint

To auto-fix linting issues.

    npm run lint -- --fix

### Make the code prettier

This runs on every commit but you can do this manually as well via:

    npm run prettier

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
