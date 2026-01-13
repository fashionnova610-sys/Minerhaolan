
import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { pages } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const pageRouter = router({
    list: publicProcedure.query(async () => {
        const db = await getDb();
        if (!db) return [];
        return db.select().from(pages).orderBy(desc(pages.updatedAt));
    }),

    getBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
            const db = await getDb();
            if (!db) return null;
            const result = await db
                .select()
                .from(pages)
                .where(eq(pages.slug, input.slug))
                .limit(1);
            return result[0] || null;
        }),

    create: adminProcedure
        .input(
            z.object({
                title: z.string(),
                slug: z.string(),
                content: z.string(),
                metaTitle: z.string().optional(),
                metaDescription: z.string().optional(),
                published: z.boolean().default(false),
            })
        )
        .mutation(async ({ input }) => {
            const db = await getDb();
            if (!db) throw new Error("Database not available");

            await db.insert(pages).values(input);
            return { success: true };
        }),

    update: adminProcedure
        .input(
            z.object({
                id: z.number(),
                data: z.object({
                    title: z.string().optional(),
                    slug: z.string().optional(),
                    content: z.string().optional(),
                    metaTitle: z.string().optional(),
                    metaDescription: z.string().optional(),
                    published: z.boolean().optional(),
                }),
            })
        )
        .mutation(async ({ input }) => {
            const db = await getDb();
            if (!db) throw new Error("Database not available");

            await db
                .update(pages)
                .set({ ...input.data, updatedAt: new Date() })
                .where(eq(pages.id, input.id));
            return { success: true };
        }),

    delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
            const db = await getDb();
            if (!db) throw new Error("Database not available");

            await db.delete(pages).where(eq(pages.id, input.id));
            return { success: true };
        }),
});
