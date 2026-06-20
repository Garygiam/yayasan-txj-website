# Production Site URL SEO Design

## Goal

Fix the production SEO URL generation so sitemap and robots no longer emit `http://localhost:3000`, and instead use:

`https://www.yayasantxj.org`

Primary source:

`process.env.NEXT_PUBLIC_SITE_URL`

Fallback:

`https://www.yayasantxj.org`

## Scope

- Audit the current sitemap, robots, and shared site URL helper.
- Remove localhost fallback behavior from production SEO URL generation.
- Use the production domain as the shared fallback.
- Keep `NEXT_PUBLIC_SITE_URL` as the primary source.
- Verify sitemap output contains no localhost URLs.
- Verify robots points to `https://www.yayasantxj.org/sitemap.xml`.
- Run lint.
- Run production build.
- Push the fix to `main`.
- Confirm production sitemap is valid by checking the live sitemap and robots outputs.

## Out Of Scope

- Broad SEO refactors unrelated to site URL generation.
- Dynamic CMS sitemap expansion.
- Search Console submission workflow.
- Vercel dashboard-only debugging that requires unavailable credentials.

## Recommended Approach

Fix the shared helper in `src/lib/seo/siteUrl.ts` so all existing callers inherit the correct production URL behavior automatically. This is safer than patching only sitemap and robots because the same helper is already used by metadata, alternates, and schema-related code paths.

## Architecture

### Shared Site URL Helper

Update:

`src/lib/seo/siteUrl.ts`

Current behavior:

- reads `process.env.NEXT_PUBLIC_SITE_URL`
- falls back to `http://localhost:3000`

Target behavior:

- reads `process.env.NEXT_PUBLIC_SITE_URL`
- falls back to `https://www.yayasantxj.org`
- removes any trailing slash from the final value

### Existing Callers

The following can remain unchanged and should inherit the correct output from the helper:

- `src/app/sitemap.ts`
- `src/app/robots.ts`
- root metadata and route metadata callers that use `getSiteUrl()`

### Verification Strategy

1. Update the helper fallback.
2. Add or update a focused regression test for `getSiteUrl()` or the closest SEO helper coverage so localhost fallback cannot return.
3. Run lint.
4. Run production build.
5. Start the production server locally.
6. Request local `sitemap.xml` and confirm there are no `localhost` URLs.
7. Request local `robots.txt` and confirm the sitemap entry is `https://www.yayasantxj.org/sitemap.xml`.
8. Push to `main`.
9. Request the live production `sitemap.xml` and `robots.txt`.
10. Confirm live sitemap contains no `localhost` references and robots points to the correct sitemap URL.

## Files Expected To Change

- `src/lib/seo/siteUrl.ts`
- optionally a new or updated SEO helper test file

## Risks And Mitigations

### Hidden Localhost Leakage

Risk: changing only `sitemap.ts` would leave other SEO paths still capable of emitting localhost URLs.

Mitigation: fix the shared helper used by all callers.

### Trailing Slash Inconsistency

Risk: mixed site URL formats could generate malformed canonical or sitemap URLs.

Mitigation: preserve the existing trailing slash normalization in the helper.

### Production Mismatch

Risk: local verification passes, but production still serves stale outputs.

Mitigation: verify the live `sitemap.xml` and `robots.txt` after pushing.

## Success Criteria

- `getSiteUrl()` uses `NEXT_PUBLIC_SITE_URL` first
- fallback is `https://www.yayasantxj.org`
- no localhost URLs appear in sitemap output
- robots points to `https://www.yayasantxj.org/sitemap.xml`
- lint passes
- production build passes
- change is pushed to `main`
- live production sitemap and robots reflect the corrected production domain
