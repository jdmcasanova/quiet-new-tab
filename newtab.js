import { normalizeUrl } from "./settings.js";

try {
  const { homepageUrl } = await chrome.storage.local.get("homepageUrl");
  if (homepageUrl) {
    const frame = document.querySelector("#homepage");
    frame.src = normalizeUrl(homepageUrl);
    frame.hidden = false;
    document.querySelector("#welcome").hidden = true;
  }
} catch {
  document.querySelector("#error").textContent =
    "Could not load your homepage setting. Choose it again in Settings.";
}
