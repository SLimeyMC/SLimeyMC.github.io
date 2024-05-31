import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { getCollection } from 'astro:content';



export async function GET(context) {
    const blogs = await getCollection('blog');
    return rss({
        title: 'SlimeyAr | Blog',
        description: 'My journey on game development and worldbuilding',
        site: context.site,
        items: blogs.map((blog) => ({
            title: blog.data.title,
            pubDate: (blog.data.createdAt || blog.data.updatedAt),
            description: blog.data.description,
            link: `/blog/${blog.slug}/`,
        })),
        customData: `<language>en-GB</language>`,
    });
}