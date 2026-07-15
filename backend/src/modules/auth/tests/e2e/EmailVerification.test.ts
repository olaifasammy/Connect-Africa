import request from 'supertest';
import { createApp } from '@shared/interfaces/http/app';
const app = createApp();

describe('Email Verification E2E', () => {
  it('should verify email for a registered user', async () => {
    const email = `test-${Date.now()}@example.com`;
    const password = 'Password123!';

    // 1. Register
    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send({ email, password });
    
    // In a real system, we'd get a user ID from the registration response
    // or a database. Assuming for this test registration returns the userId
    // or we can fetch it. For simplicity, let's assume we can get it from the registration.
    const userId = registerRes.body.data?.userId;

    // 2. Verify Email
    const verifyRes = await request(app)
      .post('/api/v1/auth/verify-email')
      .send({ userId });
      
    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.success).toBe(true);
  });
});
