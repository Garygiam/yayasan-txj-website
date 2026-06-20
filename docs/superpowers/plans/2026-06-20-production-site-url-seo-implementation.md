# Production Site URL SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace localhost SEO URL fallback behavior with the production domain so sitemap and robots always emit correct absolute production URLs when `NEXT_PUBLIC_SITE_URL` is not configured.

**Architecture:** Update the shared `getSiteUrl()` helper in `src/lib/seo/siteUrl.ts` so all existing sitemap, robots, metadata, and alternates callers inherit the correct production fallback automatically. Add a focused regression test for helper behavior, then verify local and live sitemap/robots outputs after push.

**Tech Stack:** Next.js 16 App Router, TypeScript, Vitest, ESLint, npm, Git

---

### Task 1: Add regression coverage for production site URL fallback

**Files:**
- Create: `src/lib/seo/siteUrl.test.ts`
- Modify: `src/lib/seo/siteUrl.ts`

- [ ] **Step 1: Write the failing test for missing env fallback**

Create `src/lib/seo/siteUrl.test.ts` with:

```ts
import {afterEach, describe, expect, it, vi} from 'vitest'

describe('getSiteUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('falls back to the production domain when NEXT_PUBLIC_SITE_URL is missing', async () => {
    vi.unstubAllEnvs()
    delete process.env.NEXT_PUBLIC_SITE_URL

    const {getSiteUrl} = await import('./siteUrl')

    expect(getSiteUrl()).toBe('https://www.yayasantxj.org')
  })

  it('removes a trailing slash from NEXT_PUBLIC_SITE_URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.yayasantxj.org/')

    const {getSiteUrl} = await import('./siteUrl')

    expect(getSiteUrl()).toBe('https://www.yayasantxj.org')
  })
})
```

Expected: test file exists and expresses the required fallback behavior

- [ ] **Step 2: Run the new test to verify it fails before implementation**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npx vitest run src/lib/seo/siteUrl.test.ts
```

Expected: FAIL because the current fallback is still `http://localhost:3000`

### Task 2: Implement the production domain fallback

**Files:**
- Modify: `src/lib/seo/siteUrl.ts`
- Test: `src/lib/seo/siteUrl.test.ts`

- [ ] **Step 1: Update the shared helper**

Change `src/lib/seo/siteUrl.ts` to:

```ts
const PRODUCTION_FALLBACK = 'https://www.yayasantxj.org'

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!configured) return PRODUCTION_FALLBACK

  return configured.endsWith('/') ? configured.slice(0, -1) : configured
}
```

Expected: localhost fallback is removed

- [ ] **Step 2: Run the focused test again**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npx vitest run src/lib/seo/siteUrl.test.ts
```

Expected: PASS

- [ ] **Step 3: Run nearby SEO tests for regression safety**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npx vitest run src/lib/seo/alternates.test.ts src/lib/seo/schema.test.ts
```

Expected: PASS

### Task 3: Verify sitemap and robots locally

**Files:**
- Verify only: `src/app/sitemap.ts`
- Verify only: `src/app/robots.ts`
- Verify only: `src/lib/seo/siteUrl.ts`

- [ ] **Step 1: Run lint**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npm run lint
```

Expected: PASS

- [ ] **Step 2: Run production build**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npm run build
```

Expected: PASS

- [ ] **Step 3: Start the local production server**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
npm run start
```

Expected: app starts on `http://localhost:3000`

- [ ] **Step 4: Verify local sitemap contains no localhost URLs**

Run:

```bash
curl -s http://localhost:3000/sitemap.xml
```

Expected:

```text
contains https://www.yayasantxj.org/...
does not contain http://localhost:3000
```

- [ ] **Step 5: Verify local robots points to the production sitemap URL**

Run:

```bash
curl -s http://localhost:3000/robots.txt
```

Expected:

```text
Sitemap: https://www.yayasantxj.org/sitemap.xml
```

- [ ] **Step 6: Stop the local production server**

Stop the temporary server from Step 3.

Expected: no verification server remains running

### Task 4: Commit and push the SEO URL fix

**Files:**
- Modify: `src/lib/seo/siteUrl.ts`
- Create: `src/lib/seo/siteUrl.test.ts`

- [ ] **Step 1: Check git status**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git status --short
```

Expected: only intended helper/test changes plus any separately managed docs commits

- [ ] **Step 2: Commit the code change**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git add src/lib/seo/siteUrl.ts src/lib/seo/siteUrl.test.ts
git commit -m "fix(seo): use production site URL in sitemap and robots"
```

Expected: commit succeeds with the helper and regression test

- [ ] **Step 3: Push to main**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git push origin main
```

Expected: push succeeds

- [ ] **Step 4: Verify the remote main ref**

Run:

```bash
cd /Users/garygiam/Desktop/Garygiam/apps/web
git ls-remote origin refs/heads/main
```

Expected: latest commit SHA is returned

### Task 5: Confirm live sitemap and robots outputs

**Files:**
- Verify only: live production `sitemap.xml`
- Verify only: live production `robots.txt`

- [ ] **Step 1: Check live sitemap**

Run:

```bash
curl -s https://www.yayasantxj.org/sitemap.xml
```

Expected:

```text
contains https://www.yayasantxj.org/en
contains https://www.yayasantxj.org/en/about
contains no localhost URLs
```

- [ ] **Step 2: Check live robots**

Run:

```bash
curl -s https://www.yayasantxj.org/robots.txt
```

Expected:

```text
Sitemap: https://www.yayasantxj.org/sitemap.xml
```

- [ ] **Step 3: Capture the final handoff**

Report all of the following:

```text
files modified
commit SHA
GitHub push confirmation
production sitemap validation result
production robots validation result
```

Expected: final handoff clearly states whether production is fully fixed and verified
