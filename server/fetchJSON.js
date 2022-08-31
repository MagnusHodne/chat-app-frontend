import fetch from "node-fetch";

export async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  return await res.json();
}
