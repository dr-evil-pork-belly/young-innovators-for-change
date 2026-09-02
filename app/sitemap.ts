import type { MetadataRoute } from 'next';
import { ORG } from '@/content/org';
import { MATH_LINE } from '@/content/mathLine';

/**
 * One entry per book in the math line, derived rather than listed, so adding a
 * grade to the curriculum cannot leave its page out of the sitemap.
 */
const MATH_ROUTES = MATH_LINE.map((b) => ({
  path: `/programs/discrete-math/${b.slug}`,
  priority: 0.85,
  changeFrequency: 'monthly' as const,
}));

const ROUTES = [
  { path: '',                              priority: 1.0,  changeFrequency: 'monthly' as const },
  { path: '/mission',                      priority: 0.9,  changeFrequency: 'monthly' as const },
  { path: '/curriculum',                   priority: 0.95, changeFrequency: 'monthly' as const },
  { path: '/pathway',                      priority: 0.9,  changeFrequency: 'monthly' as const },
  { path: '/impact',                       priority: 0.9,  changeFrequency: 'monthly' as const },
  { path: '/teachers',                     priority: 0.95, changeFrequency: 'monthly' as const },
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
  return [...ROUTES, ...MATH_ROUTES].map(({ path, priority, changeFrequency }) => ({
    url: `${ORG.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
