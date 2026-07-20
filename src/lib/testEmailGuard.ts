// Reject reserved / test / throwaway email domains at write time so they never
// pollute email_subscribers or the Resend audience.
//
// Covers RFC 2606 reserved names (example.com/.net/.org/.edu and the .test,
// .example, .invalid, .localhost TLDs), the commonly-abused test.com, plus a
// curated list of disposable-inbox providers. Input is expected already
// trimmed + lowercased, but we normalize defensively.

const RESERVED_SECOND_LEVEL = new Set([
  "example.com",
  "example.net",
  "example.org",
  "example.edu",
  "test.com",
]);

// RFC 2606 / RFC 6761 reserved TLDs — any address under these is non-routable.
const RESERVED_TLDS = new Set(["test", "example", "invalid", "localhost"]);

// Disposable / throwaway inbox providers.
const THROWAWAY_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "sharklasers.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "maildrop.cc",
  "dispostable.com",
  "fakeinbox.com",
  "mailnesia.com",
  "mintemail.com",
]);

export function isReservedTestEmail(email: string): boolean {
  const at = email.lastIndexOf("@");
  if (at === -1) return false;
  const domain = email.slice(at + 1).trim().toLowerCase();
  if (!domain) return false;

  if (RESERVED_SECOND_LEVEL.has(domain)) return true;
  if (THROWAWAY_DOMAINS.has(domain)) return true;

  const tld = domain.slice(domain.lastIndexOf(".") + 1);
  if (RESERVED_TLDS.has(tld)) return true;

  return false;
}
