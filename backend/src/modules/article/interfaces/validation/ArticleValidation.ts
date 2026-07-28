import { z } from 'zod';

export const CreateArticleRequestSchema = z.object({
  title: z.string().min(1).max(255),
  summary: z.string().min(1).max(500),
  content: z.string().min(1),
  authorId: z.string().uuid(),
  language: z.string().length(2).optional().default('en'),
});

export const UpdateArticleRequestSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  summary: z.string().min(1).max(500).optional(),
  content: z.string().min(1).optional(),
});
