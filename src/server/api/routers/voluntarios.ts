import { criarVoluntarioFormSchema } from "@/lib/validators";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { veiculos, voluntarios } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

type Voluntario = typeof voluntarios.$inferSelect;
type Veiculo = typeof veiculos.$inferSelect;

export const voluntariosRouter = createTRPCRouter({
  getById: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select()
      .from(voluntarios)
      .leftJoin(veiculos, eq(voluntarios.id, veiculos.voluntarioId))
      .where(eq(voluntarios.id, input))
      .all();

    const result = rows.reduce<
      Record<number, { voluntario: Voluntario; veiculos: Veiculo[] }>
    >((acc, row) => {
      const voluntario = row.voluntario;
      const pet = row.veiculo;
      if (!acc[voluntario.id]) {
        acc[voluntario.id] = { voluntario, veiculos: [] };
      }
      if (pet) {
        acc[voluntario.id]!.veiculos.push(pet);
      }
      return acc;
    }, {});

    return result[input];
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(voluntarios)
      .leftJoin(veiculos, eq(voluntarios.id, veiculos.id));
  }),
  create: publicProcedure
    .input(criarVoluntarioFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(voluntarios).values({
        nome: input.name,
        email: input.email,
        cpf: input.cpf,
      });
    }),
  vincularPedido: publicProcedure.mutation(async ({ ctx, input }) => {
    //
  }),
});
