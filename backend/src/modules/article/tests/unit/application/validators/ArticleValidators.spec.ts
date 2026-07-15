import { CreateArticleSchema, UpdateArticleSchema } from '@modules/article/application/validators/ArticleValidators';

describe('ArticleValidators', () => {
  it('should validate valid CreateArticle request', () => {
    const validRequest = {
      title: 'Valid Article Title',
      summary: 'This is a valid summary for the article.',
      content: 'This is a valid content that is long enough to pass the validation check.',
      authorId: '550e8400-e29b-41d4-a716-446655440000'
    };
    const result = CreateArticleSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('should fail validation for short title', () => {
    const invalidRequest = {
      title: 'Short',
      summary: 'This is a valid summary for the article.',
      content: 'This is a valid content that is long enough to pass the validation check.',
      authorId: '550e8400-e29b-41d4-a716-446655440000'
    };
    const result = CreateArticleSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });
});
