import request from 'supertest';
import { app } from '../../../src/index'; 

describe('AiController Integration', () => {
  it('should process a valid AI request', async () => {
    // Assuming a test user with ADMIN role exists or we bypass for test
    const response = await request(app)
      .post('/api/v1/ai/process')
      .set('Authorization', 'Bearer <TEST_ADMIN_TOKEN>') 
      .send({
        prompt: 'Research the impact of AI in Africa',
        provider: 'Gemini'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.content).toBeDefined();
  });
});
