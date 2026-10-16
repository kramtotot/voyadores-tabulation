# Voyadores Festival Tabulation

Upload to the GitHub Pages repo: `tally.html` (rename to `index.html`), `sw.js`, `manifest.webmanifest`, `favicon.ico`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`. Firebase config is already inside the page.

## Download App
The **Download App** button is on the sign-in page only (it is hidden once you sign in and once the app is installed). On Android Chrome it opens the install prompt; on iPhone and desktop it shows the steps. To also offer an .apk, make one at pwabuilder.com, host it, and put its link in `APK_URL` near the top of the page script.

## Updating the app
1. Change `APP_VERSION='v38'` in the page to a new value (v39 ...), change `CACHE` in `sw.js` to match, and upload both to GitHub.
2. Only when a newer version exists, the app shows a popup: **Install** (updates now) or **Download and install later** (downloads it now; it installs the next time the app is opened). No popup appears when there is no update.
3. Do not update while judges are scoring.
