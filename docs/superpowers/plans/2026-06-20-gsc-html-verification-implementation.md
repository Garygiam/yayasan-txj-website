# Google Search Console HTML Verification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Google Search Console verification file as a static public asset, verify it locally and on the live production domain, then commit and push the change.

**Architecture:** The change is a single static verification file placed directly in `public/`, allowing Next.js to serve it from the site root with no route logic. Verification happens through local production runtime checks and a post-push request to the live domain to confirm deployment.

**Tech Stack:** Next.js 16 App Router, static public assets, ESLint, npm, Git, live production URL verification

---

### Task 1: Add the Search Console verification file

**Files:**
- Create: `public/google507c81f7e3fd1a0a.html`

- [ ] **Step 1: Confirm the verification file does not already exist**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
ls public/google507c81f7e3fd1a0a.html
```

Expected: `No such file or directory`

- [ ] **Step 2: Create the verification file with the exact required body**

Create `public/google507c81f7e3fd1a0a.html` with exactly this content:

```html
google-site-verification: google507c81f7e3fd1a0a.html
```

Expected: the file exists in `public/` with no additional markup

- [ ] **Step 3: Verify the file contents exactly**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
cat public/google507c81f7e3fd1a0a.html
```

Expected:

```text
google-site-verification: google507c81f7e3fd1a0a.html
```

### Task 2: Verify static serving locally

**Files:**
- Verify only: `public/google507c81f7e3fd1a0a.html`

- [ ] **Step 1: Run lint**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npm run lint
```

Expected: command exits successfully

- [ ] **Step 2: Run production build**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npm run build
```

Expected: production build completes successfully

- [ ] **Step 3: Start the production server**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npm run start
```

Expected: app starts on `http://localhost:3000`

- [ ] **Step 4: Request the local verification URL**

Run:

```bash
curl -s http://localhost:3000/google507c81f7e3fd1a0a.html
```

Expected:

```text
google-site-verification: google507c81f7e3fd1a0a.html
```

- [ ] **Step 5: Stop the local production server**

Stop the temporary server process started in Step 3.

Expected: no local server remains running from this verification step

### Task 3: Commit the verification file

**Files:**
- Create: `public/google507c81f7e3fd1a0a.html`

- [ ] **Step 1: Confirm only the intended website change is pending**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git status --short
```

Expected: the verification file is present as the intended code change, with no unexpected artifacts

- [ ] **Step 2: Commit with the required message**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git add public/google507c81f7e3fd1a0a.html
git commit -m "feat(seo): add Google Search Console verification file"
```

Expected: a new commit is created with the required message

### Task 4: Push and verify production deployment

**Files:**
- Verify only: Git metadata and live production URL

- [ ] **Step 1: Push the commit to main**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git push origin main
```

Expected: push succeeds

- [ ] **Step 2: Verify the remote main ref**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git ls-remote origin refs/heads/main
```

Expected: the latest commit SHA is returned for `refs/heads/main`

- [ ] **Step 3: Request the live production verification URL**

Run:

```bash
curl -s https://www.yayasantxj.org/google507c81f7e3fd1a0a.html
```

Expected:

```text
google-site-verification: google507c81f7e3fd1a0a.html
```

- [ ] **Step 4: Capture the handoff details**

Report all of the following:

```text
files modified
commit SHA
deployment URL
```

Expected: final delivery includes the exact changed file, exact commit SHA, and the live verification URL that confirms deployment
