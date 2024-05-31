import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        createdAt: z.date(),
        publishedAt: z.date().optional(),
        heroImage: z.string().optional(),
    }),
});

const wikiCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        createdDate: z.date(),
        tag: z.array(z.string())
    }),
});

export const collections = {
    blog: blogCollection,
    wiki: wikiCollection
};