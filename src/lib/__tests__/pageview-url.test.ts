import test from "node:test";
import assert from "node:assert/strict";
import { sanitizePageviewUrl, filterQuery } from "../pageview-url";

test("keeps only acquisition keys", () => {
  const out = sanitizePageviewUrl(
    "https://x.com/?utm_source=ig&utm_medium=s&utm_campaign=c&utm_term=t&utm_content=u&ref=a&gclid=g&fbclid=f&token=SECRET&email=a@b.com&name=Jo",
  );
  assert.equal(out, "https://x.com/?utm_source=ig&utm_medium=s&utm_campaign=c&utm_term=t&utm_content=u&ref=a&gclid=g&fbclid=f");
});
test("drops the whole query when nothing is allowlisted", () => {
  assert.equal(sanitizePageviewUrl("https://x.com/create?state=TX&name=Jo"), "https://x.com/create");
});
test("preserves hash and passes through no-query urls", () => {
  assert.equal(sanitizePageviewUrl("https://x.com/a?b=1&utm_source=z#top"), "https://x.com/a?utm_source=z#top");
  assert.equal(sanitizePageviewUrl("https://x.com/a"), "https://x.com/a");
  assert.equal(sanitizePageviewUrl(""), "");
});
test("filterQuery accepts leading ?", () => {
  assert.equal(filterQuery("?ref=a&x=1"), "ref=a");
});
