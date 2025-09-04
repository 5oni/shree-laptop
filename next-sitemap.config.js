/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://shreelaptop.shop',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/api/*'],
  additionalPaths: async (config) => [
    // SEO Landing Pages (Currently Implemented)
    await config.transform(config, '/seo/hanumangarh-laptops'),
    await config.transform(config, '/seo/sri-ganganagar-laptops'),
    await config.transform(config, '/seo/bikaner-laptops'),
    await config.transform(config, '/seo/gaming-laptops-hanumangarh'),
    // Hanumangarh Tehsils
    await config.transform(config, '/seo/nohar-laptops'),
    await config.transform(config, '/seo/rawatsar-laptops'),
    await config.transform(config, '/seo/tibi-laptops'),
    await config.transform(config, '/seo/pilibanga-laptops'),
    await config.transform(config, '/seo/sangaria-laptops'),
    await config.transform(config, '/seo/bhadra-laptops'),
    // Nearby Areas
    await config.transform(config, '/seo/suratgarh-laptops'),
    await config.transform(config, '/seo/ellenabad-laptops'),
    await config.transform(config, '/seo/rania-laptops'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different page types
    const priority = path === '/' ? 1.0 : 
                   path.includes('hanumangarh') ? 0.9 :
                   path.includes('laptop') ? 0.8 : 0.7;
    
    const changefreq = path === '/' ? 'daily' :
                      path.includes('laptop') ? 'weekly' : 'monthly';

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
