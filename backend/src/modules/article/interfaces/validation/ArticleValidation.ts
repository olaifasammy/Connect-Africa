import { z } from 'zod';
import { CreateArticleSchema, UpdateArticleSchema } from '../../application/validators/ArticleValidators';

export const IdParamSchema = z.object({
  id: z.string().uuid(),
});
