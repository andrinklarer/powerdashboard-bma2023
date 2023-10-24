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
        amount: true,
      },
    });
    return data.map((entry) => ({
      date: `${entry.date.getDate()}.${entry.date.getMonth()}`,
      amount: entry._sum.amount,
    }));
  }),

  getAllSeperated: publicProcedure.query(async ({ ctx }) => {
    const fullData = await ctx.db.powerProduction.findMany();

    const filteredDates = await ctx.db.powerProduction.groupBy({
      by: ["date"],
    });

    return filteredDates.map((entry) => ({
      date: `${entry.date.getDate()}.${entry.date.getMonth()}`,
      Solar: fullData.findLast(
        (pred) =>
          pred.date.toDateString() == entry.date.toDateString() &&
          pred.type === "Photovoltaik",
      )?.amount,
      Wind: fullData.findLast(
        (pred) =>
          pred.date.toDateString() == entry.date.toDateString() &&
          pred.type === "Wind",
      )?.amount,
      Thermische: fullData.findLast(
        (pred) =>
          pred.date.toDateString() == entry.date.toDateString() &&
          pred.type === "Thermische",
      )?.amount,
      Speicherkraft: fullData.findLast(
        (pred) =>
          pred.date.toDateString() == entry.date.toDateString() &&
          pred.type === "Speicherkraft",
      )?.amount,
      Kernkraft: fullData.findLast(
        (pred) =>
          pred.date.toDateString() == entry.date.toDateString() &&
          pred.type === "Kernkraft",
      )?.amount,
      Flusskraft: fullData.findLast(
        (pred) =>
          pred.date.toDateString() == entry.date.toDateString() &&
          pred.type === "Flusskraft",
      )?.amount,
    }));
  }),
});
