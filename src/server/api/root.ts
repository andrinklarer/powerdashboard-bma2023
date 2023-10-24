import { powerProductionRouter } from "~/server/api/routers/power-production";
import { createTRPCRouter } from "~/server/api/trpc";
import { powerConsumptionRouter } from "./routers/power-consumption";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  powerProduction: powerProductionRouter,
  powerConsumption: powerConsumptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
