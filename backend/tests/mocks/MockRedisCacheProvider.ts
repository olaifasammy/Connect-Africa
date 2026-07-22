export class MockRedisCacheProvider {
  get = jest.fn();
  set = jest.fn();
  del = jest.fn();
}
