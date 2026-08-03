import request from 'supertest';
import { createApp } from '../../../shared/interfaces/http/app';

describe('AuditRoutes E2E', () => {
  it('should return 401 for unauthenticated access', async () => {
    const app = createApp();
    const res = await request(app).post('/api/v1/audit');
    expect(res.status).toBe(401);
  });
});
