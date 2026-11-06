import { z } from 'zod';

export const ContentBlockSchema = z.object({
  type: z.enum(['paragraph', 'heading', 'blockquote', 'list', 'image', 'map']),
  text: z.string().optional(),
  level: z.number().int().min(2).max(3).optional(),
  items: z.array(z.string()).optional(),
  url: z.string().optional(),
  caption: z.string().optional(),
  align: z.enum(['left', 'center', 'right']).optional(),
  size: z.enum(['small', 'medium', 'full']).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
});

export const CreateArticleSchema = z.object({
  title: z.string().min(5).max(255),
  summary: z.string().min(10).max(500),
  content: z.union([z.string().min(10), z.array(ContentBlockSchema)]),
  entityId: z.string().min(1),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const UpdateArticleSchema = z.object({
  expectedVersion: z.number().int().min(1).optional(),
  title: z.string().min(5).max(255).optional(),
  summary: z.string().min(10).max(500).optional(),
  content: z.union([z.string().min(10), z.array(ContentBlockSchema)]).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export class CreateArticleCommandValidator {
    validate(data: unknown) {
        return CreateArticleSchema.parse(data);
    }
}

export class UpdateArticleCommandValidator {
    validate(data: unknown) {
        return UpdateArticleSchema.parse(data);
    }
}

export class ArticleIdValidator {
    validate(data: unknown) {
        return z.string().uuid().parse(data);
    }
}
