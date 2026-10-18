import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../data';
import { getSortedPosts, getPostUrl, getPostExcerptText } from '../utils/posts';

export async function GET(context: APIContext) {
  const posts = await getSortedPosts();
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site || siteConfig.url,
    items: posts.slice(0, 10).map((post) => ({
      title: post.data.title,
      pubDate: post.data.date || new Date(),
      description: post.data.description || getPostExcerptText(post.body || '', 50),
      link: getPostUrl(post),
      categories: Array.isArray(post.data.categories)
        ? post.data.categories
        : post.data.categories
        ? [post.data.categories]
        : [],
    })),
  });
}
