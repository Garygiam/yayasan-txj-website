# GA4 Analytics Design

## Goal

Install Google Analytics 4 for the Yayasan TXJ website using the official Next.js `@next/third-parties/google` package, load it globally in the App Router root layout, and keep tracking enabled only in production.

Measurement ID: `G-83JXN5MCR7`

## Scope

- Add the official Next.js Google Analytics package dependency.
- Render GA4 once globally from the root App Router layout.
- Restrict GA4 loading to production only.
- Preserve compatibility with the existing multilingual App Router structure.
- Verify lint and production build before commit and push.
- Push the GA4 changes to `main` in the website repository.
- Report deployment status on Vercel if it is accessible from the current environment.

## Out Of Scope

- Custom event tracking for donations, contact forms, volunteer flows, or WhatsApp clicks.
- Google Tag Manager.
- Consent banner or cookie consent workflow.
- Manual `gtag.js` script injection.
- Any non-production analytics activation.

## Recommended Approach

Use `GoogleAnalytics` from `@next/third-parties/google` in the root layout so the tag is mounted once for the entire site. Gate the component behind a production-only check so local development and non-production environments do not send analytics traffic.

This is the smallest implementation that satisfies the requirement to use the official Next.js integration and keeps the analytics bootstrap aligned with the App Router architecture.

## Architecture

### Root Layout Integration

Modify the root layout at `src/app/layout.tsx` to:

- import `GoogleAnalytics` from `@next/third-parties/google`
- compute whether the current environment is production
- render `GoogleAnalytics` once inside the root layout when the environment is production

The analytics component will be added at the layout level so every localized route inherits it automatically.

### Environment Gating

Use a production check based on `process.env.NODE_ENV === 'production'`.

Behavior:

- production: load GA4
- development: do not load GA4
- test: do not load GA4

This avoids noisy analytics data from local development while keeping the implementation deterministic.

### Page View Tracking

Start without a custom route-change tracker.

Rationale:

- the official Next.js integration is the required implementation path
- adding custom pageview dispatching upfront increases duplicate-event risk
- if later verification shows App Router transitions need explicit pageview handling, add a small client tracker as a follow-up change

## Files Expected To Change

- `package.json`
- `src/app/layout.tsx`
- optionally `package-lock.json` after dependency installation

## Verification Plan

Run the following in the website repo:

```bash
npm run lint
npm run build
```

Then:

- commit with a focused analytics commit message
- push to `origin main`
- verify the pushed commit
- confirm Vercel deployment status if accessible from available tools or repository integration

## Risks And Mitigations

### Duplicate Loads

Risk: analytics could load more than once if mounted in nested layouts or client components.

Mitigation: mount `GoogleAnalytics` only in the root layout.

### Non-Production Traffic Pollution

Risk: local or test traffic pollutes GA4 reporting.

Mitigation: production-only environment gate.

### Deployment Visibility

Risk: Vercel deployment details may not be directly accessible from the current environment.

Mitigation: report verified push status and state clearly whether Vercel status was directly confirmed or requires dashboard verification.

## Success Criteria

- `@next/third-parties/google` is installed
- GA4 ID `G-83JXN5MCR7` is wired into the root App Router layout
- GA4 loads once globally
- GA4 does not load in development or test
- lint passes
- production build passes
- changes are committed and pushed to `main`
- final report includes modified files, commit ID, deployment status, and GA4 activation confirmation
