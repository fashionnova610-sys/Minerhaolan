
import { z } from "zod";
import { router, adminProcedure } from "../_core/trpc";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to client/public/uploads
// server/routers/media.ts -> server/routers -> server -> root -> client/public/uploads
const UPLOADS_DIR = path.join(__dirname, "../../client/public/uploads");

export const mediaRouter = router({
    list: adminProcedure.query(async () => {
        try {
            if (!fs.existsSync(UPLOADS_DIR)) {
                fs.mkdirSync(UPLOADS_DIR, { recursive: true });
                return [];
            }
            const files = fs.readdirSync(UPLOADS_DIR);
            // Filter for images
            const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

            return images.map(file => ({
                name: file,
                url: `/uploads/${file}`,
                size: fs.statSync(path.join(UPLOADS_DIR, file)).size,
                createdAt: fs.statSync(path.join(UPLOADS_DIR, file)).birthtime,
            }));
        } catch (error) {
            console.error("Failed to list media:", error);
            return [];
        }
    }),

    upload: adminProcedure
        .input(z.object({
            filename: z.string(),
            file: z.string(), // base64
        }))
        .mutation(async ({ input }) => {
            try {
                if (!fs.existsSync(UPLOADS_DIR)) {
                    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
                }

                // Validate file size (approximate from base64 length)
                // Base64 is ~33% larger than original. 5MB limit.
                const MAX_SIZE = 5 * 1024 * 1024;
                const approximateSize = (input.file.length * 3) / 4;
                if (approximateSize > MAX_SIZE) {
                    throw new Error("File size exceeds 5MB limit");
                }

                // Validate MIME type
                const match = input.file.match(/^data:(image\/\w+);base64,/);
                if (!match) {
                    throw new Error("Invalid file format");
                }
                const mimeType = match[1];
                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                if (!allowedTypes.includes(mimeType)) {
                    throw new Error(`Unsupported file type: ${mimeType}`);
                }

                // Remove header
                const base64Data = input.file.replace(/^data:image\/\w+;base64,/, "");
                const buffer = Buffer.from(base64Data, 'base64');

                // Ensure unique filename
                let finalFilename = input.filename;
                if (fs.existsSync(path.join(UPLOADS_DIR, finalFilename))) {
                    const ext = path.extname(finalFilename);
                    const name = path.basename(finalFilename, ext);
                    finalFilename = `${name}-${Date.now()}${ext}`;
                }

                fs.writeFileSync(path.join(UPLOADS_DIR, finalFilename), buffer);

                return {
                    success: true,
                    url: `/uploads/${finalFilename}`,
                    filename: finalFilename
                };
            } catch (error) {
                console.error("Failed to upload file:", error);
                throw new Error("Failed to upload file");
            }
        }),

    delete: adminProcedure
        .input(z.object({ filename: z.string() }))
        .mutation(async ({ input }) => {
            try {
                const filePath = path.join(UPLOADS_DIR, input.filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                return { success: true };
            } catch (error) {
                throw new Error("Failed to delete file");
            }
        }),
});
