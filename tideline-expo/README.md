# Tideline Batam — Expo app

This is a working React Native/Expo port of the Tideline Batam prototype:
mock sign-in → interests → Discover/Nearby/Groups/Thread/Profile, with the
same join/redirect logic as the web version — "Join Group" on a place that
already has a group always reuses that exact group and its message history,
never a fresh single-member one.

I built and type-checked this code (`tsc --strict`, zero errors), but I
could **not** compile it to an actual `.apk` — that needs either Expo's
cloud build service (which needs *your* login) or a local Android SDK,
neither of which I have network/tooling access to. Here's exactly how to
finish it, in order of least setup required.

## Option A — fastest real .apk, no local Android SDK (recommended)

1. Install Node.js 18+ if you don't have it.
2. In this folder:
   ```
   npm install
   npm install -g eas-cli
   npx expo install   # aligns native module versions with your Expo SDK
   eas login          # free Expo account
   eas build -p android --profile preview
   ```
3. `eas.json` is already set to `"buildType": "apk"` (not the default `.aab`),
   so this produces a directly-installable `.apk`. The build runs on Expo's
   servers (5–15 min) and gives you a download link + QR code at the end.
4. Download the `.apk`, transfer it to an Android phone (or `adb install`),
   and open it. You'll likely need to allow "install from unknown sources."

## Option B — run it live on your phone in seconds, no build at all

Good for iterating on the demo before you bother building an APK.

```
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app (Play Store) on your Android
phone. The app runs live, hot-reloading as you edit — this is the fastest
way to actually see and click through the app right now.

## Option C — local Android build (no Expo account, more setup)

```
npm install
npx expo prebuild -p android
cd android && ./gradlew assembleRelease
```

Needs Android Studio / the Android SDK installed locally. The `.apk` lands
in `android/app/build/outputs/apk/release/`.

## What's mocked for the demo

- **Sign-in** is a plain username field (`WelcomeScreen.tsx`) — no real auth.
  Swapping in Google Sign-In later means adding `expo-auth-session` and
  replacing `onStart` in `App.tsx`.
- **The map** is a stylized illustration (colored pins over a tinted
  background), not real Google Maps — this avoids needing a Maps API key
  and billing account just to demo. Swapping in real maps later means adding
  `react-native-maps` and an API key.
- **Nearby replies** are simulated on a timer (`App.tsx`, `sendNearby`/
  `sendThread`), same as the web prototype.

## Project structure

```
App.tsx                  – state + the join/redirect logic
src/data.ts               – seed events, groups, interests, reply pools
src/types.ts               – shared TypeScript types
src/theme.ts               – color tokens (matches the web prototype's light theme)
src/screens/                – one file per screen
src/components/EventSheet.tsx – bottom sheet (Join/Start Group, Share event)
src/components/TabBar.tsx     – bottom tab bar
```
