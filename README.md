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

The GitHub Pages workflow publishes the site at `https://irportugal.pt`. The repository’s Pages source must remain set to **GitHub Actions**. For another static host, use `npm run build` and publish `dist/`.

The site has no analytics, cookies, remote fonts, database or backend.
