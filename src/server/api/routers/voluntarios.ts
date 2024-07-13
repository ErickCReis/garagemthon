import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { veiculos, voluntarios } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const voluntariosRouter = createTRPCRouter({
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
