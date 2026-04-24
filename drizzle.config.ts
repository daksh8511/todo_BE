import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // ✅ REQUIRED
  dbCredentials: {
    url: process.env.DATABASE_URL!, // ✅ correct key
  },
} satisfies Config;