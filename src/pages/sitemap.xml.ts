import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data';
import { getSortedPosts, getPostUrl } from '../utils/posts';

const STATIC_PATHS = [
  '/',
  '/author/christian-storb/',
  '/blog/',
  '/career/career/',
  '/career/requirements/',
  '/consulting/',
  '/contact/contact/',
  '/contact/contacts/',
  '/partner/advertising-partner/',
  '/partner/partner/',
  '/policies/cookie-policy/',
  '/policies/legal-notice/',
  '/policies/payments-methods-info/',
  '/policies/privacy-policy/',
  '/policies/shipping-policy/',
  '/policies/terms-of-service/',
  '/policies/withdrawal-policy/',
  '/principles/',
  '/products/',
  '/profiles/',
  '/references/',
  '/references/featured-companies/',
  '/references/featured-projects/',
  '/references/featured-references/',
  '/services/',
];

export async function GET(_context: APIContext) {
  const baseUrl = siteConfig.url;
  const nowIso = new Date().toISOString();
  const posts = await getSortedPosts();
  const products = (await getCollection('products')).sort((a, b) => a.id.localeCompare(b.id));

  const urls: { loc: string; lastmod: string }[] = [];

  for (const p of STATIC_PATHS) {
    urls.push({ loc: `${baseUrl}${p}`, lastmod: nowIso });
  }

  for (const prod of products) {
    urls.push({ loc: `${baseUrl}/products/${prod.id}/`, lastmod: nowIso });
  }

  for (const post of posts) {
    const postDate = post.data.date ? post.data.date.toISOString() : nowIso;
    urls.push({ loc: `${baseUrl}${getPostUrl(post)}`, lastmod: postDate });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `<url>
<loc>${u.loc}</loc>
<lastmod>${u.lastmod}</lastmod>
</url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
