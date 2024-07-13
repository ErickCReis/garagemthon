import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { veiculos, voluntarios } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const voluntariosRouter = createTRPCRouter({
  getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db
      .select()
      .from(voluntarios)
      .leftJoin(veiculos, eq(voluntarios.id, veiculos.id))
      .where(eq(voluntarios.id, input));
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(voluntarios)
      .leftJoin(veiculos, eq(voluntarios.id, veiculos.id));
  }),
  create: publicProcedure.mutation(async ({ ctx, input }) => {
    //
  }),
  vincularPedido: publicProcedure.mutation(async ({ ctx, input }) => {
    //
  }),
});
