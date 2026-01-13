
import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { socialLinks } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const socialRouter = router({
    list: publicProcedure.query(async () => {
        const db = await getDb();
        if (!db) return [];
        return db.select().from(socialLinks).orderBy(desc(socialLinks.createdAt));
    }),

    create: adminProcedure
        .input(
            z.object({
                platform: z.string(),
                url: z.string().url(),
                icon: z.string().optional(),
                isActive: z.boolean().default(true),
            })
        )
        .mutation(async ({ input }) => {
            const db = await getDb();
            if (!db) throw new Error("Database not available");

            await db.insert(socialLinks).values(input);
            return { success: true };
        }),

    update: adminProcedure
        .input(
            z.object({
                id: z.number(),
                data: z.object({
                    platform: z.string().optional(),
                    url: z.string().url().optional(),
                    icon: z.string().optional(),
                    isActive: z.boolean().optional(),
                }),
            })
        )
        .mutation(async ({ input }) => {
            const db = await getDb();
            if (!db) throw new Error("Database not available");

            await db
                .update(socialLinks)
                .set({ ...input.data, updatedAt: new Date() })
                .where(eq(socialLinks.id, input.id));
            return { success: true };
        }),

    delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
            const db = await getDb();
            if (!db) throw new Error("Database not available");

            await db.delete(socialLinks).where(eq(socialLinks.id, input.id));
            return { success: true };
        }),
});
