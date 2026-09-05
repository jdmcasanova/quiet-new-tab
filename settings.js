export function normalizeUrl(value) {
  const url = new URL(value.trim());
  if (!["https:", "http:"].includes(url.protocol)) {
    throw new Error("Use a complete http:// or https:// URL.");
  }
  if (url.username || url.password) {
    throw new Error("Use a URL without embedded usernames or passwords.");
  }
  return url.href;
}
