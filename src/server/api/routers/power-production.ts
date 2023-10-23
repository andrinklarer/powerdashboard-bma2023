import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const powerProductionRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.powerProduction.findMany();
  }),
});
