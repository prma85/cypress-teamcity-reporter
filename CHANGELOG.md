# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.0] - 02/15/2023

### Changed

- `Node.js` 12 minimum support
- `Mocha` 4 minimum support

### Updated

- All dependencies

## [3.0.0] - 09/21/2020

### Removed

- `Bower` support
- `Node.js` 4 support (now it requires minimum of node 6)

### Changed

- _Breaking_: focus on only support node.js environments
- _Breaking_: Remove phantomJs support only supports environments which have require
- _Breaking_: Using ESLint 7+ for development, what means to create a branch/PR you will need node 10+

### Added

- Azure Pipelines CI
- Change mocha to peer dependency
- Support mocha version 8
- Drop the duration on messages if mocha returns undefined/null (for example skipped test) TeamCity will then use received timestamps to calculate duration
- Support Show diff between expected and actual values

## [2.6.1] - 02/21/2019

- Changes to publish the NPM package

## [2.6.0] - 02/20/2019

- Minor changes
- Forked travisjeffery/mocha-teamcity-reporter v2.5.0
  - Restrict mocha dependency to less than 6 due to compatibility issues
  - Vuejs/Webpack compatibility
  - Add Browser Support back in by use of separate file, solves #41
  - Add real teamcity tests
  - Add reporterOptions as optional parameter
  - Add a test to catch above PR
  - Supports node 4+ only
  - Support flowId's
    - Why use flowIds? Flow tracking is necessary, for example, to distinguish separate processes running in parallel
    - This defaults to process.pid, so it works with concurrent task runners (Gulp/Grunt etc)
  - Functional tests
  - Add top level suite option (@davidmfoley)
  - Add some eslint magic
  - Remove escape sequences from reporting
  - Fix NaN duration
