import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TOKEN,
  },
  driver: "turso",
  tablesFilter: ["garagemthon_*"],
} satisfies Config;
