import request from 'supertest';
import { app } from '../../../shared/interfaces/http/app'; // Assuming this is where the app is exported

describe('Search E2E', () => {
  it('should search entities via API', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'test' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('results');
  });
});
