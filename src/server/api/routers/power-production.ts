import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const powerProductionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.powerProduction.findMany();
  }),

  getAllGroupedByDate: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.powerProduction.groupBy({
      by: ["date"],
      _sum: {
        production: true,
      },
      orderBy: {
        date: "desc",
      },
      take: 10,
    });
    return data.map((entry) => ({
      date: `${entry.date.getDate()}.${entry.date.getMonth()}`,
      production: entry._sum.production,
    }));
  }),

  getAllSeperated: publicProcedure.query(async ({ ctx }) => {
    const fullData = await ctx.db.powerProduction.findMany({ take: 10 });

    const filteredDates = await ctx.db.powerProduction.groupBy({
      by: ["date"],
    });

    return filteredDates.map((entry) => ({
      date: `${entry.date.getDate()}.${entry.date.getMonth()}`,
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
    }));
  }),
});
