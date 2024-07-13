import { criarPedidoFormSchema } from "@/lib/validators";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { pedidos, pedidosVoluntarios, voluntarios } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

export const pedidosRouter = createTRPCRouter({
  getById: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const pedidoRows = await ctx.db
      .select()
      .from(pedidos)
      .where(eq(pedidos.id, input));

    const pedidosVoluntariosRows = await ctx.db
      .select()
      .from(pedidosVoluntarios)
      .where(eq(pedidosVoluntarios.pedidoId, input));

    const voluntariosIds = pedidosVoluntariosRows.map((pv) => pv.voluntarioId);

    const voluntarioRows = await ctx.db
      .select()
      .from(voluntarios)
      .where(sql`id IN ${voluntariosIds}`);

    return {
      ...pedidoRows[0],
      voluntarios: voluntarioRows,
    };
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(pedidos);
  }),
  getAllByDono: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.select().from(pedidos).where(eq(pedidos.donoId, input));
  }),
  create: publicProcedure
    .input(criarPedidoFormSchema)
    .mutation(async ({ ctx, input }) => {
      // @ts-expect-error - TODO: rever
      return ctx.db.insert(pedidos).values({
        donoId: input.donoId,
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
  vincularVoluntario: publicProcedure
    .input(
      z.object({
        pedido: z.number(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const voluntarioRows = await ctx.db
        .select()
        .from(voluntarios)
        .where(eq(voluntarios.email, input.email));

      const voluntario = voluntarioRows[0];
      if (!voluntario) {
        return;
      }

      await ctx.db.insert(pedidosVoluntarios).values({
        pedidoId: input.pedido,
        voluntarioId: voluntario.id,
      });
    }),
});
