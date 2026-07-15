export const siteConfig = {
  name: 'IR Portugal',
  description:
    'A small, informal community for people in Portugal doing independent research in AI, optimisation and systems.',
  siteUrl: 'https://ir-portugal.github.io/website',
  discordUrl: '',
  githubUrl: 'https://github.com/ir-portugal/website',
  contactEmail: '',
  themeColor: '#f4f1e8',
} as const;

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}` || '/';
}
