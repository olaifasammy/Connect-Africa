import { z } from 'zod';
import { SourceType } from '../../domain/value-objects/SourceValueObjects';

export const CreateSourceSchema = z.object({
  title: z.string().min(1),
  type: z.nativeEnum(SourceType),
  author: z.string().min(1),
  publishedAt: z.string().datetime(),
  url: z.string().url().optional(),
  publisher: z.string().optional(),
});

export const UpdateSourceSchema = z.object({
  title: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  publishedAt: z.string().datetime().optional(),
  url: z.string().url().optional(),
  publisher: z.string().optional(),
});

export const DeleteSourceSchema = z.object({
  id: z.string().uuid(),
});
