import { Container } from 'inversify';
import { EntityController } from '../../../interfaces/EntityController';
import { TestDatabase } from '../../../../../../tests/helpers/TestDatabase';
import { container } from '@bootstrap/container/container';
import { Request, Response } from 'express';

describe('EntityController Integration', () => {
  jest.setTimeout(30000);
  const db = new TestDatabase();
  let entityController: EntityController;
  let testContainer: Container;

  beforeAll(async () => {
    await db.start();
    // Use the main container but might need to override some bindings if necessary for pure integration tests
    testContainer = container;
    entityController = testContainer.get(EntityController);
  });

  afterAll(async () => {
    await db.stop();
  });

  it('should resolve EntityController from container', () => {
    expect(entityController).toBeDefined();
  });
});
