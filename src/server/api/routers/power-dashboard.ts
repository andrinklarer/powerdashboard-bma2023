import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { addDays, startOfMonth } from "date-fns";

interface PowerData {
  Kernkraft: number;
  Flusskraft: number;
  Speicherkraft: number;
  Photovoltaik: number;
  Thermische: number;
  Wind: number;
  Verlust: number;
  Verbrauch: number;
}

interface PowerDashboard extends PowerData {
  id: number;
  date: Date;
}

interface ProcessedRecord extends PowerDashboard {
  yearMonth: Date;
}

type GroupedDataType = Record<string, PowerData>;

export const powerDashboardRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ from: z.date(), to: z.date() }))
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

  getAllByMonth: publicProcedure
    .input(z.object({ from: z.date(), to: z.date() }))
    .query(async ({ ctx, input }) => {
      const powerData = (
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

      // Process data to extract month and year
      const processedData: ProcessedRecord[] = powerData.map((record) => {
        const yearMonth = startOfMonth(record.date);
        return { ...record, yearMonth };
      });

      // Group and aggregate data
      const groupedData: GroupedDataType = processedData.reduce(
        (acc: GroupedDataType, record) => {
          const key = record.yearMonth.toISOString();
          if (!acc[key]) {
            acc[key] = {
              Kernkraft: 0,
              Flusskraft: 0,
              Speicherkraft: 0,
              Photovoltaik: 0,
              Thermische: 0,
              Wind: 0,
              Verlust: 0,
              Verbrauch: 0,
            };
          }
          acc[key]!.Kernkraft += record.Kernkraft;
          acc[key]!.Flusskraft += record.Flusskraft;
          acc[key]!.Speicherkraft += record.Speicherkraft;
          acc[key]!.Photovoltaik += record.Photovoltaik;
          acc[key]!.Thermische += record.Thermische;
          acc[key]!.Wind += record.Wind;
          acc[key]!.Verlust += record.Verlust;
          acc[key]!.Verbrauch += record.Verbrauch;
          return acc;
        },
        {} as GroupedDataType,
      );

      // Calculate summs
      return Object.keys(groupedData).map((key) => {
        const group = groupedData[key];
        return {
          date: new Date(key),
          Kernkraft: group!.Kernkraft,
          Flusskraft: group!.Flusskraft,
          Speicherkraft: group!.Speicherkraft,
          Photovoltaik: group!.Photovoltaik,
          Thermische: group!.Thermische,
          Wind: group!.Wind,
          Verlust: group!.Verlust,
          Verbrauch: group!.Verbrauch,
        };
      });
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
