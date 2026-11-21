// REDACT-ALLOWLIST-1121 (idonthaveawill): CONTROL's encoding cases applied to every dynamic route with a fake slug.
import test from "node:test";
import assert from "node:assert/strict";
import { templateForPath, sanitizeUrl, sanitizeEvent, redactPath, redactUrlPath, ROUTE_TEMPLATES } from "../pageview-url";

const O = "https://idonthaveawill.com";
const S = "SECRETslug";
const DYN = ["blog", "estate-planning", "will-requirements"];

// [input, expected]: bare paths through templateForPath / redactPath.
const PATH_TABLE: Array<[string, string]> = [];
for (const r of DYN) {
  const T = `/${r}/:slug`;
  PATH_TABLE.push(
    [`/${r}%3F${S}`, "/other"],
    [`/${r}%23${S}`, "/other"],
    [`/${r}%09/${S}`, "/other"],
    [`/${r}%20/${S}`, "/other"],
    [`/${r};x/${S}`, "/other"],
    [`/%E0%A4%A/${r}/${S}`, "/other"],
    [`//host/${r}/${S}`, "/other"],
    [`/${r}/%252e%252e/${S}`, "/other"],
    [`/${r}/${S}/..`, `/${r}`],
    [`/${r.toUpperCase()}/${S}`, T],
    [`/${r}/${S}`, T],
    [`/${r}%2F${S}`, T],
    [`/${r}%252F${S}`, T],
    [`/${r}/./${S}`, T],
    [`/x/../${r}/${S}`, T],
    [`/${r}/${S}/`, T],
    [`\\${r}\\${S}`, T],
    [`/${r}/${S}/extra`, "/other"],
    [`/${r}/${S} x`, "/other"],
    [`/${r}/${S}%00x`, "/other"],
    [`/${r}/${S}%25`, "/other"],
    [`/${r}/${S}_x`, "/other"],
    [`/${r}/` + "a".repeat(121), "/other"],
    [`/api/${r}/${S}`, "/other"],
    [`/${r}x/${S}`, "/other"],
  );
}
PATH_TABLE.push(["/", "/"], ["", "/"]);
for (const t of ROUTE_TEMPLATES.filter((t) => !t.pattern.includes(":"))) {
  PATH_TABLE.push([t.pattern, t.pattern], [t.pattern.toUpperCase() + "/", t.pattern]);
}

// [input, expected]: full URLs through sanitizeUrl.
const URL_TABLE: Array<[string, string]> = [];
for (const r of DYN) {
  const T = `/${r}/:slug`;
  URL_TABLE.push(
    [`${O}/${r}%3F${S}`, `${O}/other`],
    [`${O}/${r}%23${S}`, `${O}/other`],
    [`${O}/${r}%09/${S}`, `${O}/other`],
    [`${O}/${r}%20/${S}`, `${O}/other`],
    [`${O}/${r};x/${S}`, `${O}/other`],
    [`${O}/%E0%A4%A/${r}/${S}`, `${O}/other`],
    [`${O}//host/${r}/${S}`, `${O}/other`],
    [`${O}/${r}/%252e%252e/${S}`, `${O}/other`],
    [`${O}/${r}/${S}/..`, `${O}/${r}`],
    [`${O}/${r.toUpperCase()}/${S}`, O + T],
    [`${O}/${r}/${S}?utm_source=g&name=${S}#${S}`, `${O}${T}?utm_source=g`],
    [`${O}/${r}?${S}`, `${O}/${r}`],
    [`https://user:${S}@idonthaveawill.com/${r}/${S}`, O + T],
    [`HTTPS://IDONTHAVEAWILL.COM/${r}/${S}`, O + T],
    [`//idonthaveawill.com/${r}/${S}`, "/other"],
  );
}
URL_TABLE.push(
  [`${O}/create?state=TX&name=${S}&ref=a`, `${O}/create?ref=a`],
  [`${O}/?a=1#/blog/${S}`, `${O}/`],
  [O, `${O}/`],
  ["http://localhost:3000/will-requirements/" + S, "http://localhost:3000/will-requirements/:slug"],
  ["odds/" + S, "/other"],
  ["javascript:" + S, "/other"],
  ["$direct", "$direct"],
);

const FORBIDDEN = [S.toLowerCase(), "host/"];

function pathPart(out: string): string {
  const m = out.match(/^[a-z]+:\/\/[^/?#]*(.*)$/);
  return (m ? m[1] : out).split("?")[0];
}

test("REDACT-ALLOWLIST path table", () => {
  for (const [input, expected] of PATH_TABLE) {
    assert.equal(templateForPath(input), expected, `templateForPath(${JSON.stringify(input)})`);
    if (input) assert.equal(redactPath(input), expected, `redactPath(${JSON.stringify(input)})`);
  }
});

test("REDACT-ALLOWLIST url table", () => {
  for (const [input, expected] of URL_TABLE) {
    assert.equal(sanitizeUrl(input), expected, `sanitizeUrl(${JSON.stringify(input)})`);
    assert.equal(redactUrlPath(input), expected, `redactUrlPath(${JSON.stringify(input)})`);
  }
});

test("REDACT-ALLOWLIST event props: every url/path prop, title, $set, $set_once", () => {
  const e = {
    properties: {
      $current_url: `${O}/will-requirements/${S}?token=s&ref=a#x`,
      $pathname: `/will-requirements/${S}`,
      title: `Will requirements for ${S}`,
      $referrer: `${O}/blog%3F${S}`,
      $initial_referrer: `https://www.google.com/search?q=${S}`,
      $prev_pageview_url: `${O}/estate-planning/${S}`,
      $prev_pageview_pathname: `/estate-planning/${S}`,
      $session_entry_url: `${O}/blog;x/${S}`,
      $session_entry_pathname: `/blog%20/${S}`,
      $initial_current_url: `${O}/blog/${S}`,
      $initial_pathname: `/blog/${S}`,
      step_index: 2,
    },
    $set: { $current_url: `${O}/blog/${S}`, $pathname: `/blog/${S}`, $referrer: `https://evil.example/blog/${S}?x=1` },
    $set_once: {
      $initial_current_url: `${O}/create?name=${S}`,
      $initial_pathname: `/create`,
      $initial_referrer: `https://www.idonthaveawill.com/estate-planning/${S}`,
      title: S,
    },
  };
  sanitizeEvent(e);
  assert.deepEqual(e.properties, {
    $current_url: `${O}/will-requirements/:slug?ref=a`,
    $pathname: "/will-requirements/:slug",
    title: "/will-requirements/:slug",
    $referrer: `${O}/other`,
    $initial_referrer: "https://www.google.com",
    $prev_pageview_url: `${O}/estate-planning/:slug`,
    $prev_pageview_pathname: "/estate-planning/:slug",
    $session_entry_url: `${O}/other`,
    $session_entry_pathname: "/other",
    $initial_current_url: `${O}/blog/:slug`,
    $initial_pathname: "/blog/:slug",
    step_index: 2,
  });
  assert.deepEqual(e.$set, { $current_url: `${O}/blog/:slug`, $pathname: "/blog/:slug", $referrer: "https://evil.example" });
  assert.deepEqual(e.$set_once, {
    $initial_current_url: `${O}/create`,
    $initial_pathname: "/create",
    $initial_referrer: `https://www.idonthaveawill.com/estate-planning/:slug`,
    title: "/other",
  });
  assert.doesNotMatch(JSON.stringify(e), /secretslug|token|google\.com\/|evil\.example\//i);
  sanitizeEvent(null);
});

test("REDACT-ALLOWLIST title becomes the template on every page", () => {
  const p: Record<string, unknown> = { $current_url: `${O}/blog/${S}`, title: "Living Will vs Last Will" };
  sanitizeEvent({ properties: p });
  assert.equal(p.title, "/blog/:slug");
});

test("REDACT-ALLOWLIST invariant: no forbidden token, path chars within [a-z0-9/:_.-]", () => {
  const outs = [
    ...PATH_TABLE.map(([i]) => templateForPath(i)),
    ...URL_TABLE.map(([i]) => sanitizeUrl(i)),
    ...URL_TABLE.map(([i]) => sanitizeUrl(i, undefined, true)),
  ];
  for (const out of outs) {
    for (const f of FORBIDDEN) assert.ok(!out.toLowerCase().includes(f), `${out} contains ${f}`);
    if (out === "$direct") continue;
    assert.match(pathPart(out), /^[a-z0-9/:_.-]*$/);
  }
});
