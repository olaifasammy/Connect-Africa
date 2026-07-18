import { PostgresProvider } from "@shared/infrastructure/database/PostgresProvider";
import request from 'supertest';
import { createApp } from '@shared/interfaces/http/app';
const app = createApp();

describe('Update Profile E2E', () => {
  it('should update profile display name for an authenticated user', async () => {
    // 1. Register/Login to get a valid token
    const email = `profile-test-${Date.now()}@example.com`;
    const password = 'Password123!';
    
    await request(app)
      .post('/api/v1/auth/register')
      .send({ email, password });
    
    const pool = PostgresProvider.getPool();
    const userRes = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    const userId = userRes.rows[0].id;
    await pool.query("INSERT INTO user_profiles (id, user_id, display_name) VALUES (gen_random_uuid(), $1, $2)", [userId, "Test User"]);
      
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email, password });
      
    const token = loginRes.body.data.token;

    // 2. Update Profile
    const updateRes = await request(app)
      .put('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ displayName: 'New Name' });
      
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.success).toBe(true);
  });

  afterAll(async () => {
    await PostgresProvider.getPool().end();
  });
});
