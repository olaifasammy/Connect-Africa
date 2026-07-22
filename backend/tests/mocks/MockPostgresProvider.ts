export class MockPostgresProvider {
  query = jest.fn();
  async connect() {}
  async disconnect() {}
  async healthCheck() { return true; }
  get pool() { return {} as any; }
}
