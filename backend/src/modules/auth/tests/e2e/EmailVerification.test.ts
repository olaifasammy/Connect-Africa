import { PostgresProvider } from "@shared/infrastructure/database/PostgresProvider";
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
    // or a database. 
    const pgProvider = new PostgresProvider();
    const userRes = await pgProvider.query('SELECT id FROM users WHERE email = $1', [email]);
    const userId = userRes.rows[0].id;

    // 2. Verify Email
    const verifyRes = await request(app)
      .post('/api/v1/auth/verify-email')
      .send({ userId });
      
    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.success).toBe(true);
  });

  afterAll(async () => {
    const pgProvider = new PostgresProvider();
    await pgProvider.disconnect();
  });
});
