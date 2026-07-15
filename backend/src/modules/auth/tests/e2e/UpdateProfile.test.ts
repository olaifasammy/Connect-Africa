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
});
