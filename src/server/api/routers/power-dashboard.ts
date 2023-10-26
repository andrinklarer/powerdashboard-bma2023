import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const powerDashboardRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ amount: z.number(), from: z.date(), to: z.date() }))
    .query(async ({ ctx, input }) => {
      input.to.setDate(input.to.getDate() + 1);
      return (
        await ctx.db.powerDashboard.findMany({
          orderBy: {
            date: "desc",
          },
          where: {
            date: {
              lte: input.to,
              gte: input.from,
            },
          },
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
