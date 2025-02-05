import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_xKoHVw0Sr2Jg@ep-calm-darkness-a8b4xdyn-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
});
