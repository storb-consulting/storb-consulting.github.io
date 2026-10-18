import { marked } from 'marked';
import { getCollection, type CollectionEntry } from 'astro:content';

export async function getSortedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => {
    const da = a.data.date ? a.data.date.getTime() : 0;
    const db = b.data.date ? b.data.date.getTime() : 0;
    if (db !== da) return db - da;
    return b.id.localeCompare(a.id);
  });
}

export function getPostUrl(post: CollectionEntry<'posts'>): string {
  if (post.data.permalink) {
    return post.data.permalink;
  }
  const id = post.id; // e.g., "2017-08-04-welcome-to-jekyll" or "2017-08-04-welcome-to-jekyll.md"
  const cleanId = id.replace(/\.md$/, '');
  const match = cleanId.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  
  let year = '';
  let month = '';
  let day = '';
  let fileSlug = cleanId;

  if (match) {
    year = match[1];
    month = match[2];
    day = match[3];
    fileSlug = match[4];
  } else {
    const d = post.data.date;
    year = String(d.getUTCFullYear());
    month = String(d.getUTCMonth() + 1).padStart(2, '0');
    day = String(d.getUTCDate()).padStart(2, '0');
  }

  const slug = post.data.slug || fileSlug;
  const rawCats = Array.isArray(post.data.categories)
    ? post.data.categories
    : post.data.categories
    ? [post.data.categories]
    : [];
  const cats = rawCats.map(c => c.trim().toLowerCase()).filter(Boolean);
  const catPath = cats.length > 0 ? `/${cats.join('/')}` : '';

  return `${catPath}/${year}/${month}/${day}/${slug}.html`;
}

export function getPostRouteParam(post: CollectionEntry<'posts'>): string {
  const url = getPostUrl(post);
  // Remove leading slash; if it ends with slash, remove trailing slash so Astro creates folder/index.html
  let param = url.replace(/^\//, '');
  if (param.endsWith('/')) {
    param = param.slice(0, -1);
  }
  return param;
}

export function getPostExcerptHtml(postOrBody: CollectionEntry<'posts'> | string): string {
  const body = typeof postOrBody === 'string' ? postOrBody : (postOrBody.body || '');
  const paragraphs = body.trim().split(/\r?\n\r?\n/);
  const firstPara = paragraphs[0] || '';
  return marked.parse(firstPara, { async: false }) as string;
}

export function getPostExcerptText(postOrBody: CollectionEntry<'posts'> | string, wordLimit = 20): string {
  const html = getPostExcerptHtml(postOrBody);
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text.split(' ').filter(Boolean);
  if (words.length <= wordLimit) {
    return words.join(' ');
  }
  return words.slice(0, wordLimit).join(' ') + '...';
}

export function formatDateShort(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
}

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function formatDateLong(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = MONTHS_EN[date.getMonth()];
  const y = date.getFullYear();
  return `${d}. ${m} ${y}`;
}

export function renderInlineMarkdown(text: string): string {
  const html = marked.parseInline(text, { async: false }) as string;
  return html;
}
