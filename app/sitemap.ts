import type { MetadataRoute } from 'next';
import { ORG } from '@/content/org';

const ROUTES = [
  { path: '',                              priority: 1.0,  changeFrequency: 'monthly' as const },
  { path: '/mission',                      priority: 0.9,  changeFrequency: 'monthly' as const },
  { path: '/curriculum',                   priority: 0.95, changeFrequency: 'monthly' as const },
  { path: '/pathway',                      priority: 0.9,  changeFrequency: 'monthly' as const },
  { path: '/impact',                       priority: 0.9,  changeFrequency: 'monthly' as const },
  { path: '/for-schools',                  priority: 0.9,  changeFrequency: 'monthly' as const },
  { path: '/about',                        priority: 0.8,  changeFrequency: 'monthly' as const },
  { path: '/governance',                   priority: 0.8,  changeFrequency: 'yearly'  as const },
  { path: '/resources',                    priority: 0.8,  changeFrequency: 'monthly' as const },
  { path: '/partner',                      priority: 0.8,  changeFrequency: 'monthly' as const },
  { path: '/programs/discrete-math',       priority: 0.9,  changeFrequency: 'monthly' as const },
  { path: '/programs/venture-lab',         priority: 0.7,  changeFrequency: 'yearly'  as const },
  { path: '/programs/leadership',          priority: 0.7,  changeFrequency: 'yearly'  as const },
  { path: '/programs/financial-literacy',  priority: 0.7,  changeFrequency: 'yearly'  as const },
  { path: '/programs/alumni-network',      priority: 0.5,  changeFrequency: 'yearly'  as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${ORG.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
