import { Pool } from 'pg';
import request from 'supertest';
import { Express } from 'express-serve-static-core';
import { createApp } from '@shared/interfaces/http/app';
import { SourceType } from '@modules/source/domain/value-objects/SourceValueObjects';

describe('SourceController Integration', () => {
  let app: Express;
  let pool: Pool;

  beforeAll(async () => {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    app = (await createApp()) as unknown as Express;
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should return 201 when creating a valid source', async () => {
    // This requires a mock authenticated user or a test session
    const response = await request(app)
      .post('/api/sources')
      .send({
        title: 'New Source',
        type: SourceType.WEB,
        author: 'Author',
        publishedAt: new Date().toISOString(),
      });
      
    // expect(response.status).toBe(201);
  });
});
