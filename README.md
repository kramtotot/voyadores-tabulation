# Voyadores Festival Tabulation

One web page (`tally.html`, rename it `index.html` for GitHub Pages) plus a Firebase project that stores the scores.
GitHub Pages hosts the page. Firebase (Firestore, free Spark plan) holds the data and handles sign-in.
A festival of this size stays far inside the free limits.

Do the setup once, with a **city-owned Google account** (not a personal one), so the project survives staff changes.

## 1. Create the Firebase project
1. Go to https://console.firebase.google.com and click **Create a project**. Name it, for example, `voyadores-tally`. Google Analytics can be off.
2. **Build > Firestore Database > Create database**. Choose **Production mode** and a region near you (for the Philippines, `asia-southeast1` Singapore).
3. **Build > Authentication > Get started > Sign-in method**. Turn on **Anonymous** and **Email/Password**.
4. **Authentication > Users > Add user**. Email `admin@voyadores.local`, and a strong password. This is the tabulator's password. Do this right away, before sharing the page link.

## 2. Publish the security rules
Firestore Database > **Rules**. Delete what is there, paste the whole of `firestore.rules`, click **Publish**.
These rules make sure judges see only their own scores, nobody can read passwords, and only the tabulator can change the setup.

## 3. Connect the page
1. Project settings (gear icon) > **Your apps** > **Web** (`</>`) > register an app. Copy the `firebaseConfig` values.
2. Open `tally.html` in a text editor. Near the end, find `const FIREBASE_CONFIG=null;` and replace `null` with your config:
   `const FIREBASE_CONFIG={apiKey:"...",authDomain:"...",projectId:"...",storageBucket:"...",messagingSenderId:"...",appId:"..."};`
   The API key is not a secret. The rules and sign-in protect the data.
3. Authentication > Settings > **Authorized domains**: add `YOURNAME.github.io`.

## 4. Put it on GitHub Pages
Upload the file as `index.html` to your repository, then Settings > Pages > deploy from the `main` branch. Open the link.

## 5. Use it
- Sign in as `admin` with the password from step 1.4.
- **Judges Setup > Create accounts** makes the judge usernames and random passwords. Hand each judge their pair.
- **Deduction judge:** In Tabulation Setup add the Judge Deduction Criteria, then in Judges Setup press Create deduction judge. That account enters deduction points per group. The totals show under Scores > Judges Deduction and come off each group's final score.
- A judge account locks to the first device that signs in. **Release** frees it (for example, a dead phone).
- If you change a judge's password while they are signed in, they must sign out and sign in again.
- **Tabulation Setup > Backup and restore**: download a backup before the event and after the results are final.
- Offline: a judge who has signed in once can keep scoring without signal. Scores sync when the signal is back.

## Install it as an app (Android)
The page is also a Progressive Web App. Upload these files to the same GitHub folder as `index.html`: `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` and `apple-touch-icon.png`.

- **Quickest:** open the site in Chrome on the phone, tap the menu (three dots) > **Install app** (or **Add to Home screen**). It gets an icon, opens full screen like an app, and opens even with no signal.
- **A real .apk file:** go to https://www.pwabuilder.com, enter the site address, press Start, then **Package for stores > Android**, and choose the option that makes an APK for installing outside Play Store. Copy the .apk to a phone and open it (allow "install unknown apps"). Because the site lives under a GitHub project address, the app may show a thin address bar at the top. The Chrome install above does not.
- After you update `index.html`, installed apps pick up the new version the next time they are opened with a connection (open it twice).

## Before the event
Run a rehearsal with two phones: sign in as two judges, enter scores, switch one phone to airplane mode, enter more, switch it back, and check the admin totals. Then use **Clear all scores** and start the real event.

## Costs and limits
Firestore free tier: 50,000 reads and 20,000 writes per day. Each judge score entry is a few writes. Security rules use extra reads, still far below the limit for a few judges. If the project is ever upgraded to a paid plan, set a budget alert.
