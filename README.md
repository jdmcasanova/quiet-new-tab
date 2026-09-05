# Quiet New Tab

Display your own homepage in each Chrome new tab while keeping the address bar ready to type.

- Choose any HTTP(S) website that permits embedding.
- No default destination; first use shows a setup screen.
- Your URL is stored locally in Chrome, not synced.
- No tracking, backend, dependencies, build step, or CI/CD.
- MIT licensed.

## Install

1. Download this repository as a ZIP (**Code → Download ZIP**) and extract it into a permanent folder.
2. Open `chrome://extensions` and enable **Developer mode**.
3. Click **Load unpacked** and select the folder containing `manifest.json`.
4. Open a new tab and click **Choose homepage**.
5. Enter your homepage URL and save.

Use Ctrl+T on Windows/Linux or Cmd+T on macOS. Immediately typing should go into the address bar.
Change or reset your URL with the **Settings** link in the bottom-right corner, or through the extension's options.
After updating the files, click **Reload** on the extension card. Keep the extracted folder in place.
Disable other new-tab extensions if they take priority. Remove this extension to restore Chrome's default new-tab page.

## How it works

A Manifest V3 `chrome_url_overrides.newtab` page embeds your chosen URL in a full-window iframe.
It never redirects the top-level page or calls focus(). Chrome supplies initial address-bar focus.
The only extension permission is `storage`. No host permissions or background worker are needed.

[Chrome's new-tab override documentation](https://developer.chrome.com/docs/extensions/develop/ui/override-chrome-pages)
and [storage documentation](https://developer.chrome.com/docs/extensions/reference/api/storage).

## Limitations

Some sites reject framing via Content-Security-Policy or X-Frame-Options; these will appear blocked or blank.
This extension does not bypass those restrictions. Choose a site that supports embedding.
Sign-in can be affected by third-party-cookie restrictions. The embedded website makes its own network requests
and may collect data under its own privacy policy. No website is contacted until you save a URL.

The extension does not inject code into your website or control its links. A link that stays inside the frame
may reach another site that blocks embedding. New-tab overrides do not apply in incognito windows.
The Preview link previews content only; test the actual new-tab shortcut to verify address-bar focus.

## Development and checks

Edit the plain HTML, CSS, and JavaScript files, then reload the unpacked extension.
No package installation or compilation is needed.

With Node.js 22.7 or newer, run the small URL-validation test locally:

```sh
node --test tests/settings.test.mjs
```

Manual checks: first-run setup, save a URL, new-tab keyboard focus, homepage interactions,
invalid URL handling, settings persistence, and reset. There are no automated CI/CD workflows.

## Privacy

The extension stores one value (`homepageUrl`) in `chrome.storage.local`.
It contains no analytics, telemetry, remote extension scripts, or external service.
Reset removes this value; uninstalling also clears extension storage.
Avoid putting credentials or secret tokens into a homepage URL.
