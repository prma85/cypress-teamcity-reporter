# 2.6.1 / 2019-02-21
- Changes to publish the NPM package

# 2.6.0 / 2019-02-21

-   Minor changes
-   Forked travisjeffery/mocha-teamcity-reporter v2.5.0
    -   Restrict mocha dependency to less than 6 due to compatibility issues
    -   Vuejs/Webpack compatibility
    -   Add Browser Support back in by use of separate file, solves #41
    -   Add real teamcity tests
    -   Add reporterOptions as optional parameter
    -   Add a test to catch above PR
    -   Supports node 4+ only
    -   Support flowId's
        -   Why use flowIds? Flow tracking is necessary, for example, to distinguish separate processes running in parallel
        -   This defaults to process.pid, so it works with concurrent task runners (Gulp/Grunt etc)
    -   Functional tests
    -   Add top level suite option (@davidmfoley)
    -   Add some eslint magic
    -   Remove escape sequences from reporting
    -   Fix NaN duration
