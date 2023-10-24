import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const powerProductionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.powerProduction.findMany({ take: 1000 });
  }),

  getAllGroupedByDate: publicProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.powerProduction.groupBy({
        by: ["date"],
        _sum: {
          production: true,
        },
        orderBy: {
          date: "desc",
        },
        take: input.amount,
      });
      return data
        .map((entry) => ({
          date: entry.date,
          production: entry._sum.production,
        }))
        .reverse();
    }),

  getAllSeperated: publicProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ ctx, input }) => {
      const fullData = await ctx.db.powerProduction.findMany({
        orderBy: {
          date: "desc",
        },
        take: input.amount * 6,
      });

      const filteredDates = await ctx.db.powerProduction.groupBy({
        by: ["date"],
        orderBy: {
          date: "desc",
        },
        take: input.amount,
      });

      return filteredDates
        .map((entry) => ({
          date: entry.date,
          Solar: fullData.findLast(
            (pred) =>
              pred.date.toDateString() == entry.date.toDateString() &&
              pred.type === "Photovoltaik",
          )!.production,
          Wind: fullData.findLast(
            (pred) =>
              pred.date.toDateString() == entry.date.toDateString() &&
              pred.type === "Wind",
          )!.production,
          Thermische: fullData.findLast(
            (pred) =>
              pred.date.toDateString() == entry.date.toDateString() &&
              pred.type === "Thermische",
          )!.production,
          Speicherkraft: fullData.findLast(
            (pred) =>
              pred.date.toDateString() == entry.date.toDateString() &&
              pred.type === "Speicherkraft",
          )!.production,
          Kernkraft: fullData.findLast(
            (pred) =>
              pred.date.toDateString() == entry.date.toDateString() &&
              pred.type === "Kernkraft",
          )!.production,
          Flusskraft: fullData.findLast(
            (pred) =>
              pred.date.toDateString() == entry.date.toDateString() &&
              pred.type === "Flusskraft",
          )!.production,
        }))
        .reverse();
    }),
});
