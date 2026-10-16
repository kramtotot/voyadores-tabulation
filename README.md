# Voyadores Festival Tabulation

Upload to the GitHub Pages repo: `tally.html` (rename to `index.html`), `sw.js`, `manifest.webmanifest`, `favicon.ico`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`. Firebase config is already inside the page.

## Download App
The **Download App** button is on the login page and the top bar. On Android Chrome it opens the install prompt; on iPhone and desktop it shows the steps. It disappears once the app is installed. To also offer an Android .apk, make one at pwabuilder.com, host it (for example as a GitHub release) and put its link in `APK_URL` near the top of the page script.

## Updating the app
1. Edit the page. Change `APP_VERSION='v38'` to a new value (v39 ...) and upload the new `index.html` to GitHub. Also change `CACHE` in `sw.js` to match.
2. Installed apps check for a new version on open, when you come back to the app, and every 20 minutes. When one is found, a bar shows **Update App and Install** (or Later). Tapping it refreshes the app. No reinstall is needed, because the installed app and an APK made by PWABuilder both load the page from GitHub.
3. Do not update while judges are scoring. Offline scores are kept and sent when back online.
