import { z } from 'zod';

export const CreateArticleSchema = z.object({
  title: z.string().min(5).max(255),
  summary: z.string().min(10).max(500),
  content: z.string().min(50),
  authorId: z.string().uuid(),
});

export const UpdateArticleSchema = z.object({
  title: z.string().min(5).max(255).optional(),
  summary: z.string().min(10).max(500).optional(),
  content: z.string().min(50).optional(),
});
