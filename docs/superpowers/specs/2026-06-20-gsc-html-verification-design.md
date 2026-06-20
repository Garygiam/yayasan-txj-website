# Google Search Console HTML Verification Design

## Goal

Add the Google Search Console HTML verification file to the Yayasan TXJ website so it is served at:

`https://www.yayasantxj.org/google507c81f7e3fd1a0a.html`

Required response body:

```html
google-site-verification: google507c81f7e3fd1a0a.html
```

## Scope

- Add the verification file to the website public assets.
- Verify the file is accessible locally after build/start.
- Run `npm run lint`.
- Run `npm run build`.
- Commit the change with the required commit message.
- Push the change to `main`.
- Confirm deployment by checking the production URL directly.
- Report modified files, commit SHA, and deployment URL.

## Out Of Scope

- Meta tag based Search Console verification.
- DNS-based Search Console verification.
- Additional SEO changes unrelated to the verification file.
- Any Vercel dashboard/API-only checks that require unavailable credentials.

## Recommended Approach

Use a static file in `public/` so Next.js serves the verification page directly with no route logic. This is the lowest-risk implementation and exactly matches Google Search Console’s file verification flow.

## Architecture

### Static Asset Placement

Create:

`public/google507c81f7e3fd1a0a.html`

Because assets in `public/` are served from the site root, this file will be available at:

`/google507c81f7e3fd1a0a.html`

### File Content

The file body must be exactly:

```html
google-site-verification: google507c81f7e3fd1a0a.html
```

No HTML wrapper is required.

### Verification Strategy

1. Run lint.
2. Run production build.
3. Start the production server locally.
4. Request `http://localhost:3000/google507c81f7e3fd1a0a.html`.
5. Confirm the response body exactly matches the required verification string.
6. Push to GitHub.
7. Confirm deployment by requesting:

`https://www.yayasantxj.org/google507c81f7e3fd1a0a.html`

If the live production URL returns the same verification string, treat that as deployment confirmation.

## Files Expected To Change

- `public/google507c81f7e3fd1a0a.html`

## Risks And Mitigations

### Wrong Response Body

Risk: Google rejects verification if the file contents differ from the expected text.

Mitigation: use the exact required string with no extra markup or whitespace assumptions in verification.

### Wrong Path

Risk: placing the file outside `public/` prevents root-level access.

Mitigation: place the file directly under `public/`.

### Deployment Visibility

Risk: Vercel CLI credentials are unavailable.

Mitigation: verify the live production domain directly instead of relying on authenticated Vercel CLI output.

## Success Criteria

- `public/google507c81f7e3fd1a0a.html` exists
- local production runtime serves the exact verification string
- `npm run lint` passes
- `npm run build` passes
- change is committed with `feat(seo): add Google Search Console verification file`
- push to `main` succeeds
- production URL responds successfully with the verification string
- final report includes modified files, commit SHA, and deployment URL
