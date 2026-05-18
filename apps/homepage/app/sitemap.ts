import type { MetadataRoute } from 'next';

const baseUrl = 'https://hashdate.example';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/download',
    '/safety',
    '/work-status',
    '/support',
    '/privacy',
    '/terms',
    '/account-deletion'
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date('2026-05-17'),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7
  }));
}
