import { criarPedidoFormSchema } from "@/lib/validators";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { pedidos, pedidosVoluntarios, voluntarios } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const pedidosRouter = createTRPCRouter({
  getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db
      .select()
      .from(pedidosVoluntarios)
      .leftJoin(pedidos, eq(pedidos.id, pedidosVoluntarios.pedidoId))
      .leftJoin(
        voluntarios,
        eq(voluntarios.id, pedidosVoluntarios.voluntarioId),
      )
      .where(eq(pedidos.id, input));
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(pedidos);
  }),
  create: publicProcedure
    .input(criarPedidoFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(pedidos).values({
        pontoColeta: input.pontoColeta,
        pontoEntrega: input.pontoEntrega,
        items: input.items,
        meiosTransportes: Object.entries(input.meiosTransporte).reduce(
          (acc, [key, value]) => {
            if (value) {
              acc.push(key);
            }
            return acc;
          },
          [] as string[],
        ),
      });
    }),
  vincularVoluntario: publicProcedure.mutation(async ({ ctx, input }) => {
    //
  }),
});
