import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { orders, products } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const ordersRouter = router({
    create: publicProcedure
        .input(z.object({
            items: z.array(z.object({
                productId: z.number(),
                quantity: z.number(),
                price: z.number(), // Store price at time of purchase
            })),
            totalAmount: z.number(),
            currency: z.string(),
            paymentMethod: z.enum(['btc', 'usdt', 'eth', 'bank', 'visa']),
            shippingAddress: z.object({
                firstName: z.string(),
                lastName: z.string(),
                email: z.string().email(),
                phone: z.string(),
                address: z.string(),
                city: z.string(),
                country: z.string(),
                zipCode: z.string(),
            }),
        }))
        .mutation(async ({ input }) => {
            const db = await getDb();

            // Generate a simple order number (e.g., MH-1700000000)
            const orderNumber = `MH-${Math.floor(Date.now() / 1000)}`;

            if (!db) {
                // Mock success response
                return {
                    id: 1,
                    userId: 0,
                    orderNumber,
                    status: "pending",
                    totalAmount: input.totalAmount,
                    currency: input.currency,
                    shippingAddress: input.shippingAddress,
                    billingAddress: input.shippingAddress,
                    items: input.items,
                    notes: `Payment Method: ${input.paymentMethod}`,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
            }

            // Create the order
            const [newOrder] = await db.insert(orders).values({
                userId: 0, // Guest user for now, or handle auth user if available
                orderNumber,
                status: "pending",
                totalAmount: input.totalAmount,
                currency: input.currency,
                shippingAddress: input.shippingAddress,
                billingAddress: input.shippingAddress, // Use shipping as billing for simplicity for now
                items: input.items,
                notes: `Payment Method: ${input.paymentMethod}`,
            }).returning();

            return newOrder;
        }),

    getByOrderNumber: publicProcedure
        .input(z.object({
            orderNumber: z.string(),
        }))
        .query(async ({ input }) => {
            const db = await getDb();
            if (!db) {
                // Mock fallback
                return {
                    id: 1,
                    userId: 0,
                    orderNumber: input.orderNumber,
                    status: "pending",
                    totalAmount: 8499, // Mock amount
                    currency: "USD",
                    shippingAddress: {
                        firstName: "Test",
                        lastName: "User",
                        email: "test@example.com",
                        phone: "1234567890",
                        address: "123 Test St",
                        city: "Test City",
                        country: "USA",
                        zipCode: "12345"
                    },
                    billingAddress: {},
                    items: [],
                    notes: "Mock Order",
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
            }

            const order = await db.query.orders.findFirst({
                where: eq(orders.orderNumber, input.orderNumber),
            });

            if (!order) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Order not found",
                });
            }

            return order;
        }),
});
