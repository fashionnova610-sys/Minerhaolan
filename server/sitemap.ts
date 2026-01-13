import { Express } from "express";
import { getDb } from "./db";
import { products, pages, blogPosts } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export function registerSitemapRoute(app: Express) {
    app.get("/sitemap.xml", async (req, res) => {
        try {
            const db = await getDb();
            if (!db) {
                return res.status(500).send("Database connection failed");
            }

            const baseUrl = "https://minerhaolan.shop";
            const urls: { loc: string; lastmod?: Date; changefreq?: string; priority?: number }[] = [];

            // Static pages
            urls.push(
                { loc: `${baseUrl}/`, changefreq: "daily", priority: 1.0 },
                { loc: `${baseUrl}/collections/all`, changefreq: "daily", priority: 0.8 },
                { loc: `${baseUrl}/pages/about`, changefreq: "monthly", priority: 0.5 },
                { loc: `${baseUrl}/pages/contact`, changefreq: "monthly", priority: 0.5 },
                { loc: `${baseUrl}/pages/faqs`, changefreq: "weekly", priority: 0.6 },
                { loc: `${baseUrl}/calculator`, changefreq: "weekly", priority: 0.7 }
            );

            // Products
            const allProducts = await db.select({
                slug: products.slug,
                updatedAt: products.updatedAt
            }).from(products);

            allProducts.forEach(p => {
                urls.push({
                    loc: `${baseUrl}/product/${p.slug}`,
                    lastmod: p.updatedAt,
                    changefreq: "daily",
                    priority: 0.9
                });
            });

            // Dynamic Pages
            const allPages = await db.select({
                slug: pages.slug,
                updatedAt: pages.updatedAt
            }).from(pages).where(eq(pages.published, true));

            allPages.forEach(p => {
                urls.push({
                    loc: `${baseUrl}/pages/${p.slug}`,
                    lastmod: p.updatedAt,
                    changefreq: "weekly",
                    priority: 0.6
                });
            });

            // Blog Posts
            const allPosts = await db.select({
                slug: blogPosts.slug,
                updatedAt: blogPosts.updatedAt
            }).from(blogPosts).where(eq(blogPosts.published, true));

            allPosts.forEach(p => {
                urls.push({
                    loc: `${baseUrl}/blog/${p.slug}`,
                    lastmod: p.updatedAt,
                    changefreq: "weekly",
                    priority: 0.7
                });
            });

            // Generate XML
            const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod.toISOString()}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

            res.header("Content-Type", "application/xml");
            res.send(xml);

        } catch (error) {
            console.error("Sitemap generation error:", error);
            res.status(500).send("Error generating sitemap");
        }
    });
}
