# GA4 Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install Google Analytics 4 with the official Next.js integration, load it once globally from the App Router root layout, keep it production-only, then verify, commit, push, and confirm deployment status.

**Architecture:** The implementation adds `@next/third-parties` to the website app and mounts `GoogleAnalytics` in the root layout at `src/app/layout.tsx`. A simple `NODE_ENV === 'production'` gate keeps analytics disabled in development and test while allowing all localized routes to inherit a single global analytics instance.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, ESLint, npm, Git, Vercel

---

### Task 1: Add the official GA4 dependency

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Confirm the dependency is not already installed**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
grep -n "@next/third-parties" package.json
```

Expected: no match

- [ ] **Step 2: Install the official Next.js third-parties package**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npm install @next/third-parties@16.2.7
```

Expected: `package.json` and `package-lock.json` update without install errors

- [ ] **Step 3: Verify the dependency was recorded**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
grep -n "@next/third-parties" package.json package-lock.json
```

Expected: both files contain the dependency entry

- [ ] **Step 4: Commit the dependency install**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git add package.json package-lock.json
git commit -m "build: add next third-parties package"
```

Expected: a commit containing only the dependency addition

### Task 2: Mount GA4 once in the root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Read the current root layout before editing**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
sed -n '1,200p' src/app/layout.tsx
```

Expected: current root layout content is printed for reference

- [ ] **Step 2: Add the official Google Analytics component with production-only gating**

Update `src/app/layout.tsx` so it matches this structure:

```tsx
import type {Metadata} from 'next'
import {GoogleAnalytics} from '@next/third-parties/google'
import {headers} from 'next/headers'
import './globals.css'
import {fontBody, fontDisplay, fontZhBody, fontZhDisplay} from './fonts'
import {buildSocialMetadata, resolveDocumentLanguage} from '@/lib/seo/metadata'
import {getSiteUrl} from '@/lib/seo/siteUrl'

const siteUrl = getSiteUrl()
const GA_MEASUREMENT_ID = 'G-83JXN5MCR7'
const shouldLoadAnalytics = process.env.NODE_ENV === 'production'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'TXJ Care',
  description: 'TXJ Care community support across Malaysia',
  ...buildSocialMetadata({
    title: 'TXJ Care',
    description: 'TXJ Care community support across Malaysia',
    path: '/',
  }),
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const requestHeaders = await headers()
  const documentLanguage = resolveDocumentLanguage(requestHeaders.get('X-NEXT-INTL-LOCALE'))

  return (
    <html
      lang={documentLanguage}
      className={`${fontBody.variable} ${fontDisplay.variable} ${fontZhBody.variable} ${fontZhDisplay.variable}`}
    >
      <body>
        {children}
        {shouldLoadAnalytics ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
      </body>
    </html>
  )
}
```

Expected: GA4 is mounted once globally from the root layout and is disabled outside production

- [ ] **Step 3: Verify the measurement ID and component placement**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
grep -n "G-83JXN5MCR7\\|GoogleAnalytics" src/app/layout.tsx
```

Expected: both the import and the measurement ID are present in the root layout

- [ ] **Step 4: Commit the layout integration**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git add src/app/layout.tsx
git commit -m "feat(analytics): add global GA4 tracking"
```

Expected: a commit containing only the root layout analytics integration

### Task 3: Verify lint and production build

**Files:**
- Verify only: `package.json`, `src/app/layout.tsx`

- [ ] **Step 1: Run lint**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npm run lint
```

Expected: command exits successfully with no blocking lint errors

- [ ] **Step 2: Run the production build**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npm run build
```

Expected: Next.js production build completes successfully

- [ ] **Step 3: Confirm the working tree is clean except for intended GA4 changes**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git status --short
```

Expected: no unexpected untracked or modified files remain

### Task 4: Push to GitHub and verify the remote branch

**Files:**
- Verify only: Git metadata for `/Users/garygiam/Desktop/Garygiam/apps/web`

- [ ] **Step 1: Confirm the remote is correct**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git remote -v
```

Expected: `origin` points to `https://github.com/Garygiam/yayasan-txj-website.git`

- [ ] **Step 2: Push the analytics commits to main**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git push origin main
```

Expected: push succeeds without rejection

- [ ] **Step 3: Verify the remote main ref**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git ls-remote origin refs/heads/main
```

Expected: the latest commit hash is returned for `refs/heads/main`

### Task 5: Confirm deployment status and prepare handoff

**Files:**
- Verify only: deployment status from Vercel or linked Git provider output

- [ ] **Step 1: Check whether Vercel deployment status is directly accessible**

Run one of the available verification paths:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git remote -v
```

If Vercel tooling or dashboard access is available, use it to confirm the latest deployment status for the pushed commit.

Expected: deployment status is either directly confirmed or explicitly marked as requiring dashboard verification

- [ ] **Step 2: Capture the final delivery details**

Report all of the following:

```text
Files modified
Commit ID
Deployment status
Confirmation that GA4 Measurement ID G-83JXN5MCR7 is active
```

Expected: final handoff includes exact files, exact commit hash, and a clear statement about GA4 activation and deployment visibility
