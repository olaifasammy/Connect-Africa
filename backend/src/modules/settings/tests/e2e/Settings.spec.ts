import request from 'supertest';
import { createApp } from '@shared/interfaces/http/app';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';

const app = createApp();

describe('Settings E2E', () => {
  it('should get settings', async () => {
    // Assuming authentication is mocked
    const res = await request(app)
      .get('/api/v1/settings')
      .set('Authorization', 'Bearer mock-token');
      
    // expect(res.status).toBe(200);
  });
});
