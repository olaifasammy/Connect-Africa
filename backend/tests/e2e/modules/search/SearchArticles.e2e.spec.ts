import request from 'supertest';
import { app } from '../../../shared/interfaces/http/app';

describe('Search Articles E2E', () => {
  it('should search articles via API', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'article-title', filters: { resourceType: 'article' } });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('results');
  });
});
