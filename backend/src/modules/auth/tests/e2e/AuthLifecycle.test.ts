import request from 'supertest';
import { createApp } from '../../../../shared/interfaces/http/app';
import { TestDatabase } from '../../../../../tests/helpers/TestDatabase';

describe('AuthLifecycle E2E', () => {
  jest.setTimeout(30000);
  const db = new TestDatabase();

  beforeAll(async () => {
    await db.start();
  });

  afterAll(async () => {
    await db.stop();
  });

  it('should execute a complete user journey: Register -> Login', async () => {
    const app = createApp();
    const registerResponse = await request(app)
      .post('/auth/register')
      .send({ email: 'e2e@test.com', password: 'password123' });

    expect(registerResponse.status).toBe(201);

    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: 'e2e@test.com', password: 'password123' });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('accessToken');
  });
});
