# IR Portugal website

A small public landing page for IR Portugal. It explains the idea and points people to the community Discord. It is intentionally not a project directory, institutional website or management system.

## Run locally

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

The local site normally runs at `http://localhost:4321`.

## Configure

Edit `src/config/site.ts` and add the real values before publishing:

```ts
discordUrl: 'https://discord.gg/your-invite',
githubUrl: 'https://github.com/your-organisation',
contactEmail: 'your-public-email@example.org',
```

Empty links are not rendered. The page shows a direct note when the Discord invite has not yet been configured.

## Check

```bash
npm run format:check
npm run check
npm run lint
npm run build
npm run check:links
```

## Deploy

The GitHub Pages workflow builds a project site at `https://<organisation>.github.io/<repository>/`. Set the repository’s Pages source to **GitHub Actions**. For another static host, use `npm run build` and publish `dist/`.

For a custom domain, update `siteUrl` in `src/config/site.ts`, set `SITE_URL` and `BASE_PATH=/` in the deployment environment, and update the sitemap URL in `public/robots.txt`.

The site has no analytics, cookies, remote fonts, database or backend.
