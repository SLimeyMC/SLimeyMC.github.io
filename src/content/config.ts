import {z, defineCollection, reference} from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        createdAt: z.date(),
        language: z.enum(['en-US', 'en-GB', 'id-ID']).optional().default('en-GB'),
        updatedAt: z.date().optional(),
        heroSrc: image().optional(),
        heroAlt: z.string().optional().default("placeholder; no image"),
        tags: z.array(z.string()),
        relatedBlogs: z.array(reference('blog')).optional(),
        footnote: z.string().optional(),
    }),
});

/* TODO get github user and it's commit date for the revision history */
const wikiCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        createdAt: z.date(),
        tag: z.array(z.string())
    }),
});

export const collections = {
    blog: blogCollection,
    wiki: wikiCollection
};