import { criarPedidoFormSchema } from "@/lib/validators";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { pedidos } from "@/server/db/schema";

export const pedidosRouter = createTRPCRouter({
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
});
