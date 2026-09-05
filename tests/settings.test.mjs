import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeUrl } from "../settings.js";

test("normalizes HTTP(S) URLs and preserves paths and queries", () => {
  assert.equal(normalizeUrl(" https://example.com "), "https://example.com/");
  assert.equal(normalizeUrl("http://localhost:8080/dashboard?q=hello#today"), "http://localhost:8080/dashboard?q=hello#today");
});
test("rejects executable, local-file, malformed and credential-bearing URLs", () => {
  for (const value of ["javascript:alert(1)", "data:text/html,hi", "file:///tmp/page.html", "chrome://settings", "", "example.com", "https://user:password@example.com"]) {
    assert.throws(() => normalizeUrl(value), value);
  }
});
