import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { veiculos } from "@/server/db/schema";

export const veiculosRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(veiculos);
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
