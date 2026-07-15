import request from 'supertest';
import { createApp } from '@shared/interfaces/http/app';
const app = createApp();

describe('Graph E2E Lifecycle', () => {
  let authToken: string;

  beforeAll(async () => {
    // Setup: Login to get a valid token
    const email = `test-graph-${Date.now()}@example.com`;
    const password = 'Password123!';

    await request(app).post('/api/v1/auth/register').send({ email, password });
    const loginRes = await request(app).post('/api/v1/auth/login').send({ email, password });
    authToken = loginRes.body.data.token;
  });

  it('should create nodes and edge, then find shortest path', async () => {
    // 1. Create Node 1
    await request(app)
      .post('/graph/nodes')
      .set('Authorization', `Bearer ${authToken}`)
      .set('x-test-role', 'ADMIN') // Use ADMIN role for testing
      .send({ entityId: 'n1', type: 'person' })
      .expect(201);

    // 2. Create Node 2
    await request(app)
      .post('/graph/nodes')
      .set('Authorization', `Bearer ${authToken}`)
      .set('x-test-role', 'ADMIN') // Use ADMIN role for testing
      .send({ entityId: 'n2', type: 'person' })
      .expect(201);

    // 3. Create Edge
    await request(app)
      .post('/graph/edges')
      .set('Authorization', `Bearer ${authToken}`)
      .set('x-test-role', 'ADMIN') // Use ADMIN role for testing
      .send({ sourceEntityId: 'n1', targetEntityId: 'n2', relationshipType: 'KNOWS' })
      .expect(201);

    // 4. Search Graph
    const searchRes = await request(app)
      .get('/graph/search')
      .set('Authorization', `Bearer ${authToken}`)
      .set('x-test-role', 'ADMIN')
      .query({ label: 'person' })
      .expect(200);

    expect(Array.isArray(searchRes.body)).toBe(true);
    expect(searchRes.body.some((n: any) => n.entityId === 'n1')).toBe(true);

    // 5. Find Shortest Path
    const res = await request(app)
      .get('/graph/path')
      .set('Authorization', `Bearer ${authToken}`)
      .set('x-test-role', 'ADMIN') 
      .query({ start: 'n1', end: 'n2' })
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].entityId).toBe('n1');
    expect(res.body[res.body.length - 1].entityId).toBe('n2');
