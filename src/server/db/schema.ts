// src/server/db/schema.ts

import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `garagemthon_${name}`);

export const posts = createTable(
  "post",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const vehicles = createTable(
  "vehicle",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    type: text("type", { length: 256 }).notNull(),
    description: text("description", { length: 1024 }).notNull(),
    vehicleId: text("vehicleId", { length: 256 }).notNull(),
    model: text("model", { length: 256 }).notNull(),
    color: text("color", { length: 256 }).notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
  },
  (vehicle) => ({
    typeIndex: index("type_idx").on(vehicle.type),
  })
);
