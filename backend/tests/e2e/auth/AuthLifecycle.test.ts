import request from 'supertest';
import { createApp } from '@interfaces/http/app';
const app = createApp();

describe('Auth E2E Lifecycle', () => {
  it('should register, login, and refresh token', async () => {
    const email = `test-${Date.now()}@example.com`;
    const password = 'Password123!';

    // 1. Register
    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send({ email, password });
    expect(registerRes.status).toBe(201);

    // 2. Login
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email, password });
    expect(loginRes.status).toBe(200);
    const token = loginRes.body.data.token;
    expect(token).toBeDefined();

    // 3. Logout
    const logoutRes = await request(app)
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${token}`);
    expect(logoutRes.status).toBe(200);
  });
});
