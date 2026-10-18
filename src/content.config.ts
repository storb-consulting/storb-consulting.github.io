import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    layout: z.string().optional(),
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    permalink: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    description: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    author: z.union([
      z.string(),
      z.object({
        name: z.string(),
        url: z.string().optional()
      })
    ]).optional(),
    locale: z.string().optional(),
    seo: z.object({
      type: z.string().optional()
    }).optional(),
    toc: z.boolean().optional(),
    toc_label: z.string().optional(),
    toc_icon: z.string().optional(),
    redirect_from: z.array(z.string()).optional()
  })
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
    layout: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    version: z.string().optional(),
    date: z.coerce.date().optional(),
    nuget_id: z.string().nullable().optional(),
    repo_url: z.string().nullable().optional()
  })
});

export const collections = { posts, products };
