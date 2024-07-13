import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { vehicles } from "@/server/db/schema";

export const volunteersRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({   vehicleId: z.string().min(1),
                        vehicleDescription: z.string(),
                        vehicleType: z.string(),
                        vehicleModel: z.string(),
                        vehicleColor: z.string()  }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(vehicles).values({
        vehicleId:input.vehicleId,
        description:input.vehicleDescription,
        color:input.vehicleColor,
        type:input.vehicleType,
        model:input.vehicleModel,
        
        
    });
    }),

});
