"use strict";
const { execFile } = require("child_process");
const { assert } = require("chai");
const { logMochaOutput, getMochaPath } = require("../testHelpers");
const internalMochaPath = getMochaPath();
const path = require("path");

describe("Check TeamCity Output is correct with outer suite", function () {
  let teamCityStdout, teamCityStderr, teamCityOutputArray;

  function verifyResults() {
    it("stdout output should exist", function () {
      assert.isOk(teamCityStdout, "has output");
      assert.isOk(teamCityOutputArray, "array of output is populated");
      assert.isOk(teamCityOutputArray.length >= 10, "at least 10 lines of output");
    });

    it("stderr output should not exist", function () {
      assert.isOk(teamCityStderr.length === 0);
    });

    it("Prefix suite start is present", function () {
      const rowToCheck = teamCityOutputArray[0];
      assert.isOk(/##teamcity\[testSuiteStarted/.test(rowToCheck));
      assert.isOk(/name='test-outer-suite-name'/.test(rowToCheck));
      assert.isOk(/flowId=/.test(rowToCheck));
      assert.isOk(/]/.test(rowToCheck));
    });

    it("Prefix suite end is present", function () {
      const rowToCheck = teamCityOutputArray[17];
      assert.isOk(/##teamcity\[testSuiteFinished/.test(rowToCheck));
      assert.isNotOk(/name='mocha.suite'/.test(rowToCheck));
      assert.isOk(/duration=/.test(rowToCheck));
      assert.isOk(/flowId=/.test(rowToCheck));
      assert.isOk(/]/.test(rowToCheck));
    });

    it("Skip Test Finished is ignored", function () {
      const rowToCheck = teamCityOutputArray[7];
      assert.isOk(/##teamcity\[testIgnored/.test(rowToCheck));
      assert.isOk(/name='Skipped Test @skip'/.test(rowToCheck));
      assert.isOk(/flowId=/.test(rowToCheck));
      assert.isOk(/message='Skipped Test @skip'/.test(rowToCheck));
      assert.isNotOk(/duration=/.test(rowToCheck));
      assert.isOk(/]/.test(rowToCheck));
    });

    it("Test Failed with Retry Started is OK", function () {
      const rowToCheck = teamCityOutputArray[9];
      assert.isOk(/##teamcity\[testStarted/.test(rowToCheck));
      assert.isOk(/name='Failing Test with Retry @fail'/.test(rowToCheck));
      assert.isOk(/flowId=/.test(rowToCheck));
      assert.isOk(/duration=/.test(rowToCheck) === false);
      assert.isOk(/]/.test(rowToCheck));
    });
  
    it("Test Failed with Retry is Failing", function () {
      const rowToCheck = teamCityOutputArray[14];
      assert.isOk(/##teamcity\[testFailed/.test(rowToCheck));
      assert.isOk(/name='Failing Test with Retry @fail'/.test(rowToCheck));
      assert.isOk(/flowId=/.test(rowToCheck));
      assert.isOk(/duration=/.test(rowToCheck) === false);
      assert.isOk(/details='/.test(rowToCheck));
      assert.isOk(/AssertionError/.test(rowToCheck));
      assert.isOk(/|n/.test(rowToCheck));
      assert.isOk(/|simple.js:15:12/.test(rowToCheck));
      assert.isOk(/captureStandardOutput='true'/.test(rowToCheck));
      assert.isOk(/]/.test(rowToCheck));
    });
  
    it("Failing Test with Retry Metadata is OK", function () {
      let rowToCheck = teamCityOutputArray[10];
      assert.match(rowToCheck, /##teamcity\[testMetadata/);
      assert.match(rowToCheck, /testName='Failing Test with Retry @fail'/);
      assert.match(rowToCheck, /name='retry'/);
      assert.match(rowToCheck, /type='number'/);
      assert.match(rowToCheck, /value='1'/);
      assert.match(rowToCheck, /]/);
      rowToCheck = teamCityOutputArray[12];
      assert.match(rowToCheck, /##teamcity\[testMetadata/);
      assert.match(rowToCheck, /testName='Failing Test with Retry @fail'/);
      assert.match(rowToCheck, /name='retry'/);
      assert.match(rowToCheck, /type='number'/);
      assert.match(rowToCheck, /value='2'/);
      assert.match(rowToCheck, /]/);
    });
  
    it("Failing Test with Retry Finished is OK", function () {
      const rowToCheck = teamCityOutputArray[15];
      assert.match(rowToCheck, /##teamcity\[testFinished/);
      assert.match(rowToCheck, /name='Failing Test with Retry @fail'/);
      assert.match(rowToCheck, /flowId=/);
      assert.match(rowToCheck, /duration=/);
      assert.match(rowToCheck, /]/);
    });

    it("Suite Root Finished is OK", function () {
      const rowToCheck = teamCityOutputArray[17];
      assert.isOk(/##teamcity\[testSuiteFinished/.test(rowToCheck));
      assert.isNotOk(/name='mocha.suite'/.test(rowToCheck));
      assert.isOk(/duration=/.test(rowToCheck));
      assert.isOk(/flowId=/.test(rowToCheck));
      assert.isOk(/]/.test(rowToCheck));
    });
  }

  describe("specified as an env var", function () {
    before(function (done) {
      const opts = {
        env: Object.assign(
          {
            MOCHA_TEAMCITY_TOP_LEVEL_SUITE: "test-outer-suite-name",
          },
          process.env
        ),
      };

      execFile(
        internalMochaPath,
        [path.join("test", "test_data", "simple.js"), "--reporter", "lib/teamcity"],
        opts,
        (err, stdout, stderr) => {
          teamCityStdout = stdout;
          teamCityStderr = stderr;
          teamCityOutputArray = stdout.split("\n");
          logMochaOutput(stdout, stderr);
          done();
        }
      );
    });
    verifyResults();
  });

  describe("specified with --reporter-options", function () {
    before(function (done) {
      execFile(
        internalMochaPath,
        [
          path.join("test", "test_data", "simple.js"),
          "--reporter",
          "lib/teamcity",
          "--reporter-options",
          "topLevelSuite=test-outer-suite-name",
        ],
        (err, stdout, stderr) => {
          teamCityStdout = stdout;
          teamCityStderr = stderr;
          teamCityOutputArray = stdout.split("\n");
          logMochaOutput(stdout, stderr);
          done();
        }
      );
    });
    verifyResults();
  });
});
