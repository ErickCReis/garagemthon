import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { pedidosRouter } from "./routers/pedidos";
import { veiculosRouter } from "./routers/veiculos";
import { voluntariosRouter } from "./routers/voluntarios";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  pedido: pedidosRouter,
  voluntarios: voluntariosRouter,
  veiculos: veiculosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
