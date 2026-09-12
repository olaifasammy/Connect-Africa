import { z } from 'zod';

export const GetMetricsSchema = z.object({
  params: z.object({
    context: z.string().min(1),
  }),
  query: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});

export const GetReportSchema = z.object({
  params: z.object({
    context: z.string().min(1),
  }),
  query: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});
