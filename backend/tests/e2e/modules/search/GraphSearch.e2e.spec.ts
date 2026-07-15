import request from 'supertest';
import { app } from '../../../shared/interfaces/http/app';

describe('Graph Search E2E', () => {
  it('should search graph neighbors via API', async () => {
    const response = await request(app)
      .get('/api/search/graph')
      .query({ type: 'neighbors', entityId: 'test-id' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nodes');
  });
});
