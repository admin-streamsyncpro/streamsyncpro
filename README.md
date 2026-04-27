# Stream Sync Pro LIVE

Desktop app built with Electron that connects to TikTok LIVE, reads chat comments in real time, and supports GitHub Releases auto-updates in packaged builds.

## What it does

- Connects to a TikTok LIVE by username.
- Streams incoming chat comments into a desktop UI.
- Supports packaged app updates through GitHub Releases.
- Packages to a Windows NSIS installer with `electron-builder`.

## Local development

1. Install dependencies:

   `npm install`

2. Start the app:

   `npm start`

## Build a Windows installer

Run:

`npm run dist`

The installer will be written to `dist/`.

## GitHub releases

1. Replace the placeholder GitHub owner and repo values in `package.json`.
2. Push this project to your GitHub repository.
3. Bump the version in `package.json`, for example `1.0.0` to `1.0.1`.
4. Commit and push your changes.
5. Create and push a tag that matches the version:

   `git tag v1.0.1`

   `git push origin v1.0.1`

6. GitHub Actions will build the Windows installer and publish it to GitHub Releases automatically.

The workflow file is `.github/workflows/release.yml`.

Important notes:

- Auto-update checks only run in packaged builds, not during `npm start`.
- Windows auto-updates are designed around NSIS installers.
- The app checks GitHub Releases on launch after you save the GitHub owner and repo in the app.

## TikTok connector note

The chat connection is powered by `tiktok-live-connector`, which is a reverse-engineered community package rather than an official TikTok API. TikTok can change internal behavior at any time, which may temporarily affect connectivity.
