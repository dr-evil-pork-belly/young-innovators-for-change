import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /**
   * Retired routes. Each one was linked from the nav, the sitemap and other
   * pages, so an old link or a search result may still carry it. A permanent
   * redirect keeps those from landing on a 404.
   *
   * /for-schools, retired 16 October 2026. It offered a Grade 2 classroom
   * pilot with printing included, a pilot packet and a measurement plan. That
   * is not the plan any more: the first thing that runs is the summer cohort,
   * and the school-facing ask lives on /partner.
   */
  async redirects() {
    return [
      { source: '/for-schools', destination: '/partner', permanent: true },
    ];
  },
};

export default nextConfig;
