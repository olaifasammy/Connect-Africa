import request from 'supertest';
import { createApp } from '@shared/interfaces/http/app';
const app = createApp();

describe('Password Reset E2E', () => {
  it('should reset password for a registered user', async () => {
    const email = `test-${Date.now()}@example.com`;
    const password = 'Password123!';
    const newPassword = 'NewPassword123!';

    // 1. Register
    await request(app)
      .post('/api/v1/auth/register')
      .send({ email, password });

    // 2. Reset Password
    const resetRes = await request(app)
      .post('/api/v1/auth/reset-password')
      .send({ email, newPassword });
    expect(resetRes.status).toBe(200);

    // 3. Login with new password
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email, password: newPassword });
    expect(loginRes.status).toBe(200);
  });
});
