import { z } from 'zod';

export const GetMetricsSchema = z.object({
  params: z.object({
    context: z.string().min(1),
  }),
  query: z.object({
    eventName: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    limit: z.string().optional(),
    offset: z.string().optional(),
  }),
});

export const GetReportSchema = z.object({
  params: z.object({
    context: z.string().min(1),
  }),
  query: z.object({
    eventName: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});

export const TrackMetricSchema = z.object({
  body: z.object({
    eventName: z.string().min(1),
    sourceContext: z.string().min(1),
    metadata: z.record(z.string(), z.any()),
  }),
});
