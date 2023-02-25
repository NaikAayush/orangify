import { JsonSerializableMiddleware } from './json-serializable.middleware';

describe('JsonSerializableMiddleware', () => {
  it('should be defined', () => {
    expect(new JsonSerializableMiddleware()).toBeDefined();
  });
});
