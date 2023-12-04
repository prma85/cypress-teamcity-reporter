"use strict";
const assert = require("assert");
describe("Top Describe", function () {
  it("Passing Test @pass", function () {
    assert.equal(1, 1);
  });
  it("Failing Test @fail", function () {
    assert.equal(2, 1);
  });
  it.skip("Skipped Test @skip", function () {
    assert.equal(2, 1);
  });
  it("Failing Test with Retry @fail", function () {
    this.retries(2);
    assert.equal(2, 1);
  });
});
