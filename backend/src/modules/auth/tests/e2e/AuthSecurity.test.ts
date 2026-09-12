import request from 'supertest';
import { createApp } from '../../../../shared/interfaces/http/app';
import { TestDatabase } from '../../../../../tests/helpers/TestDatabase';

describe('Auth Security E2E', () => {
  jest.setTimeout(30000);
  const db = new TestDatabase();
  const app = createApp();

  beforeAll(async () => {
    await db.start();
  });

  afterAll(async () => {
    await db.stop();
  });

  it('should enable MFA', async () => {
    // Setup user
    await request(app).post('/api/v1/auth/register').send({ email: 'mfa@test.com', password: 'password123' });
    const loginRes = await request(app).post('/api/v1/auth/login').send({ email: 'mfa@test.com', password: 'password123' });
    const token = loginRes.body.data.token;

    // Enable MFA
    const mfaRes = await request(app)
      .post('/api/v1/auth/enable-mfa')
      .set('Authorization', `Bearer ${token}`);

    expect(mfaRes.status).toBe(200);
    expect(mfaRes.body.data).toHaveProperty('secret');
  });

  it('should lock account after 5 failed login attempts', async () => {
    // Setup user
    await request(app).post('/api/v1/auth/register').send({ email: 'lockout@test.com', password: 'password123' });

    // 5 failed attempts
    for (let i = 0; i < 5; i++) {
        await request(app).post('/api/v1/auth/login').send({ email: 'lockout@test.com', password: 'wrongpassword' });
    }

    // 6th attempt should be locked
    const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'lockout@test.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.error).toContain('Account is locked');
  });
});
