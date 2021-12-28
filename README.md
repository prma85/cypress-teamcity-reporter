# cypress-teamcity-reporter

[![NPM version](https://badge.fury.io/js/cypress-teamcity-reporter.svg)](http://badge.fury.io/js/cypress-teamcity-reporter) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/5039ebe8175e46eaa00a8ef85dbcf523)](https://www.codacy.com/manual/paulo85br/cypress-teamcity-reporter?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prma85/cypress-teamcity-reporter&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/prma85/cypress-teamcity-reporter.svg?branch=master)](https://travis-ci.org/prma85/cypress-teamcity-reporter)

cypress-teamcity-reporter is a Teamcity reporter which makes it possible to display test results in real-time, makes test information
available on the Tests tab of the Build Results page. It is based on the package `@cypress/mocha-teamcity-reporter` and was improved with new informations and support to the newer versions of mocha.

## Version changes

Check out the [changelog]("./CHANGELOG.md")

## Requirements

- NodeJs 6+
- Web Browser supporting ES6

## To Install

In your project run a npm install command:

`npm install cypress-teamcity-reporter --save-dev`

or 

`yarn add cypress-teamcity-reporter --dev`

## Usage

https://github.com/visionmedia/mocha/wiki/Third-party-reporters describes using third party reporters in mocha.

Then call mocha with:

`mocha --reporter cypress-teamcity-reporter test`

To use it in the TeamCity, you can call:

`cypress run --reporter cypress-teamcity-reporter`

## Running In Browser

- Use `lib/teamcityBrowser`
- Has option parsing stripped out for the moment
- Example use can be found in `test\browser`
- Custom log function can be set with window.customLogFunction

## Customization

### TeamCity flowId

Can set flowId like:
`mocha test --reporter mocha-teamcity-reporter --reporter-options flowId=gobbledygook`

### Top-level suite name

Can set a top-level suite name, which will wrap all other suites.  
This is useful for reading test output when running multiple suites in a single build

- Environment variable: `MOCHA_TEAMCITY_TOP_LEVEL_SUITE=<suiteName>`
- Reporter option: `topLevelSuite=<suiteName>`

### log test failures with std error

To enable this please
Please note this will probaly be made default in the next major version

- Environment variable: `USE_STD_ERROR=true`
- Reporter option: `useStdError=true`

### Record hook failures

Record failures for hooks such as before/after etc
Please note this will probably be made default in the next major version

- Environment variable: `RECORD_HOOK_FAILURES=true`
- Reporter option: `recordHookFailures=true`

### Associate Failing Tests with Screenshots

Automatically associate failing tests with a screenshot through the `testMetaData` tag.

  - Environment variable: `TEAMCITY_SCREENSHOTS=true`
  - Reporter Option: `teamcityScreenshots=true`
  - Default: `false`

  - Environment variable: `SCREENSHOTS_ARTIFACTS_DIR="path/to/screenshots"`
  - Reporter Option: `screenshotsArtifactsDir=\"path/to/screenshots\"`
  - Default: `screenshots`

  - Environment variable: `CYPRESS_INTEGRATION_FOLDER="path/to/integration"`
  - Reporter Option: `integrationFolder=\"path/to/integration\"`
  - Default: `cypress/integration`
    - Note: Setting the environment variable will override the integration folder cypress uses to execute tests.

### Setting options

- Set with reporter-options:

`mocha test --reporter mocha-teamcity-reporter --reporter-options topLevelSuite=top-level-suite-name`

`mocha test --reporter mocha-teamcity-reporter --reporter-options useStdError=true`

`mocha test --reporter mocha-teamcity-reporter --reporter-options useStdError=true`

- Set with environment variable

`MOCHA_TEAMCITY_TOP_LEVEL_SUITE='top-level-suite-name' mocha test --reporter mocha-teamcity-reporter`
