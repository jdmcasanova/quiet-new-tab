import { normalizeUrl } from "./settings.js";

const input = document.querySelector("#url");
const status = document.querySelector("#status");
const form = document.querySelector("#settings");
const reset = document.querySelector("#reset");

try {
  const { homepageUrl = "" } = await chrome.storage.local.get("homepageUrl");
  input.value = homepageUrl;
} catch {
  status.textContent = "Could not read your setting. You can try saving again.";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const homepageUrl = normalizeUrl(input.value);
    await chrome.storage.local.set({ homepageUrl });
    input.value = homepageUrl;
    status.textContent = "Saved. Open a new tab to use your homepage.";
  } catch (error) {
    status.textContent = error instanceof TypeError
      ? "Enter a complete URL, such as https://example.com."
      : error.message || "Could not save. Please try again.";
  }
});

reset.addEventListener("click", async () => {
  try {
    await chrome.storage.local.remove("homepageUrl");
    input.value = "";
    status.textContent = "Reset. New tabs will show the setup screen.";
  } catch {
    status.textContent = "Could not reset. Please try again.";
  }
});
