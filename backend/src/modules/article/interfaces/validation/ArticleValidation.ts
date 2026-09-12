import { z } from 'zod';

export const IdParamSchema = z.object({
  id: z.string().uuid(),
});

export const BookmarkSchema = z.object({
  articleId: z.string().uuid(),
});

export const ReadingHistorySchema = z.object({
  articleId: z.string().uuid(),
});

export const UpdateReadingProgressSchema = z.object({
  articleId: z.string().uuid(),
  progress: z.number().min(0).max(100),
});
