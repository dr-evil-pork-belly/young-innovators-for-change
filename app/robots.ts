import type { MetadataRoute } from 'next';
import { ORG } from '@/content/org';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${ORG.url}/sitemap.xml`,
  };
}
