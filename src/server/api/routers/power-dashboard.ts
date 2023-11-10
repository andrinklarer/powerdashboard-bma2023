import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { addDays } from "date-fns";

interface AggregatedData {
  count: number;
  Kernkraft: number;
  Flusskraft: number;
  Speicherkraft: number;
  Photovoltaik: number;
  Thermische: number;
  Wind: number;
  Verlust: number;
  Verbrauch: number;
}

interface PowerDashboard {
  id: number;
  date: Date;
  Kernkraft: number;
  Flusskraft: number;
  Speicherkraft: number;
  Photovoltaik: number;
  Thermische: number;
  Wind: number;
  Verlust: number;
  Verbrauch: number;
}

interface ProcessedRecord extends PowerDashboard {
  yearMonth: Date;
}

type GroupedDataType = Record<string, AggregatedData>;

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
              lte: addDays(input.to, 1),
              gte: input.from,
            },
          },
        })
      ).reverse();

      // Process data to extract month and year
      const processedData: ProcessedRecord[] = powerData.map((record) => {
        const date = new Date(record.date);
        const yearMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        return { ...record, yearMonth };
      });

      // Group and aggregate data
      const groupedData: GroupedDataType = processedData.reduce(
        (acc: GroupedDataType, record) => {
          const key = record.yearMonth.toISOString();
          if (!acc[key]) {
            acc[key] = {
              count: 0,
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
          acc[key]!.count += 1;
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
      ); // Explicitly type the initial value

      // Calculate averages
      const averages = Object.keys(groupedData).map((key) => {
        const group = groupedData[key];
        return {
          date: new Date(key),
          Kernkraft: group!.Kernkraft / group!.count,
          Flusskraft: group!.Flusskraft / group!.count,
          Speicherkraft: group!.Speicherkraft / group!.count,
          Photovoltaik: group!.Photovoltaik / group!.count,
          Thermische: group!.Thermische / group!.count,
          Wind: group!.Wind / group!.count,
          Verlust: group!.Verlust / group!.count,
          Verbrauch: group!.Verbrauch / group!.count,
        };
      });
      return averages;
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
