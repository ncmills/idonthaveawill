// IndexNow integration. Filename of the key file in /public IS the key value.

export const INDEXNOW_KEY = "f38d87e351594c1caabf0ef7452a4e74";
export const INDEXNOW_HOST = "idonthaveawill.com";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export function buildIndexNowPayload(urls: string[]): IndexNowPayload {
  return {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urls,
  };
}

export async function submitToIndexNow(urls: string[]): Promise<{
  ok: boolean;
  status: number;
  submitted: number;
}> {
  if (urls.length === 0) return { ok: true, status: 200, submitted: 0 };
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(buildIndexNowPayload(urls)),
  });
  return { ok: res.ok, status: res.status, submitted: urls.length };
}
