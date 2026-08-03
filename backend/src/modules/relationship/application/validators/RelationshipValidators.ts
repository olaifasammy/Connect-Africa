import { z } from 'zod';

export const CreateRelationshipSchema = z.object({
  sourceEntityId: z.string().uuid(),
  sourceEntityTypeId: z.string().uuid(),
  targetEntityId: z.string().uuid(),
  targetEntityTypeId: z.string().uuid(),
  relationshipTypeId: z.string().uuid(),
});

export const UpdateRelationshipSchema = z.object({
  relationshipTypeId: z.string().uuid(),
});

export const CardinalitySchema = z.object({
  maxCount: z.number().int().positive(),
});

export const ConfidenceSchema = z.object({
  score: z.number().min(0).max(1),
});

export const MetadataSchema = z.record(z.string(), z.any());

export const TimeRangeSchema = z.object({
  start: z.date(),
  end: z.date().optional(),
}).refine(data => !data.end || data.start <= data.end, {
  message: "Start date must be before end date",
  path: ["end"],
});
