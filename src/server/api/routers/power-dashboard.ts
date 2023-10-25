import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const powerDashboardRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ ctx, input }) => {
      return (
        await ctx.db.powerDashboard.findMany({
          orderBy: {
            date: "desc",
          },
          take: input.amount,
        })
      ).reverse();
    }),
  getLastDate: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.powerDashboard.findFirst({
      select: { date: true },
      orderBy: { date: "desc" },
    });
  }),
  getFirstDate: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.powerDashboard.findFirst({
      select: { date: true },
      orderBy: { date: "asc" },
    });
  }),
});
