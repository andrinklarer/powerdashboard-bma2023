import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const powerConsumptionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.powerConsumption.findMany({ take: 1000 });
  }),

  getLastN: publicProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.powerConsumption.groupBy({
        by: ["date"],
        _sum: {
          lossless: true,
        },
        orderBy: {
          date: "desc",
        },
        take: input.amount,
      });
      return data
        .map((entry) => ({
          date: entry.date,
          consumption: entry._sum.lossless,
        }))
        .reverse();
    }),

  getLossesOfLastN: publicProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.powerConsumption.groupBy({
        by: ["date"],
        _sum: {
          lossless: true,
          consumption: true,
        },
        orderBy: {
          date: "desc",
        },
        take: input.amount,
      });
      return data
        .map((entry) => ({
          date: entry.date,
          losses:
            entry._sum.consumption && entry._sum.lossless
              ? entry._sum.consumption - entry._sum.lossless
              : 0,
          totalConsumption: entry._sum.consumption,
        }))
        .reverse();
    }),
});
