import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { addDays, format } from "date-fns";

export const powerDashboardRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ amount: z.number(), from: z.date(), to: z.date() }))
    .query(async ({ ctx, input }) => {
      return (
        await ctx.db.powerDashboard.findMany({
          orderBy: {
            date: "desc",
          },
          where: {
            date: {
              lte: addDays(input.to, 1),
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
