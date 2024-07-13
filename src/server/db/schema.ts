// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { blob, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `garagemthon_${name}`);

export const pedidos = createTable(
  "pedido",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    pontoColeta: text("ponto_coleta").notNull(),
    pontoEntrega: text("ponto_entrega").notNull(),
    items: blob("items", { mode: "json" }).notNull().$type<
      {
        tipo: string;
        quantidade: number;
      }[]
    >(),
    meiosTransportes: blob("meios_transportes", { mode: "json" })
      .notNull()
      .$type<string[]>(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  // (example) => ({
  //   nameIndex: index("name_idx").on(example.name),
  // })
);
