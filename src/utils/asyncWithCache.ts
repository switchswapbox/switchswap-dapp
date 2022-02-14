const cacheObject = new Map<string, any>();

export default async function asyncWithCache<T>(
  func: (...args: unknown[]) => Promise<T>,
  key: string
) {
  const cached = cacheObject.get(key);
  if (cached) {
    return cached;
  }
  const result = await func();
  cacheObject.set(key, result);
  return result;
}
