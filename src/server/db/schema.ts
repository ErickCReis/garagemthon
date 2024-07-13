// src/server/db/schema.ts

import { relations, sql } from "drizzle-orm";
import { blob, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `garagemthon_${name}`);

export const pedidos = createTable("pedido", {
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
});

export const pedidosRelations = relations(pedidos, ({ many }) => ({
  veiculos: many(pedidosVoluntarios),
}));

export const veiculos = createTable("veiculo", {
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
    () => new Date(),
  ),
});

export const voluntarios = createTable("voluntario", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  nome: text("nome", { length: 256 }).notNull(),
  email: text("email", { length: 256 }).notNull(),
  cpf: text("cpf", { length: 256 }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const voluntariosRelations = relations(voluntarios, ({ many }) => ({
  veiculos: many(voluntariosVeiculos),
}));

export const pedidosVoluntarios = createTable("pedido_voluntario", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  pedidoId: int("pedido_id", { mode: "number" })
    .notNull()
    .references(() => pedidos.id),
  voluntarioId: int("voluntario_id", { mode: "number" })
    .notNull()
    .references(() => voluntarios.id),
});

export const voluntariosVeiculos = createTable("voluntario_veiculo", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  voluntarioId: int("voluntario_id", { mode: "number" })
    .notNull()
    .references(() => voluntarios.id),
  vehicleId: int("vehicle_id", { mode: "number" })
    .notNull()
    .references(() => veiculos.id),
});
