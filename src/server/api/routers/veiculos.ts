import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { veiculos, voluntarios } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const veiculosRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .select({
        vehicle: veiculos,
        owner: voluntarios,
      })
      .from(veiculos)
      .leftJoin(voluntarios, eq(veiculos.voluntarioId, voluntarios.id));
  }),
  create: publicProcedure
    .input(
      z.object({
        vehicleId: z.string().min(1),
        vehicleDescription: z.string(),
        vehicleType: z.string(),
        vehicleModel: z.string(),
        vehicleColor: z.string(),
        imgUrl: z.string(),
        voluntarioId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(veiculos).values({
        vehicleId: input.vehicleId,
        description: input.vehicleDescription,
        color: input.vehicleColor,
        type: input.vehicleType,
        model: input.vehicleModel,
        imgUrl: input.imgUrl,
        voluntarioId: input.voluntarioId,
      });
    }),
});
