import Client from '../src/network/Client';
import FetchPolicy from '../src/network/FetchPolicy';

const POLICIES = Object.values(FetchPolicy);
const TEST_URL = 'https://example.com/?lang=en#hash';
const client = new Client(null);

// Client.shouldYieldCache

test('should yield cache for cache policies', () => {
  expect(client.shouldYieldCache(FetchPolicy.cacheOnly, null)).toBe(true);
  expect(client.shouldYieldCache(FetchPolicy.cacheFirst, null)).toBe(true);
  expect(client.shouldYieldCache(FetchPolicy.cacheAndNetwork, null)).toBe(true);
});

test('should not yield cache for network only policies', () => {
  expect(client.shouldYieldCache(FetchPolicy.networkOnly, null)).toBe(false);
  expect(client.shouldYieldCache(FetchPolicy.noCache, null)).toBe(false);
});

// Client.shouldYieldNetwork

test('cacheFirst yields from network if no cache data is present', () => {
  const policy = FetchPolicy.cacheFirst;
  expect(client.shouldYieldNetwork(policy, null)).toBe(true);
});

test('cacheFirst does not yield network if cache data is present', () => {
  const policy = FetchPolicy.cacheFirst;
  expect(client.shouldYieldNetwork(policy, {})).toBe(false);
});

test('cacheOnly prevents yielding from network', () => {
  const policy = FetchPolicy.cacheOnly;
  expect(client.shouldYieldNetwork(policy, null)).toBe(false);
  expect(client.shouldYieldNetwork(policy, {})).toBe(false);
});

test('network policies cause network yield', () => {
  const policies = [
    FetchPolicy.cacheAndNetwork,
    FetchPolicy.networkOnly,
    FetchPolicy.noCache,
  ];
  for (const policy of policies) {
    expect(client.shouldYieldNetwork(policy, null)).toBe(true);
    expect(client.shouldYieldNetwork(policy, {})).toBe(true);
  }
});

// Client.shouldUpdateCache

test('should cache explicit GET requests', () => {
  const policy = FetchPolicy.cacheAndNetwork;
  const options = {method: 'GET'};
  expect(client.shouldUpdateCache(policy, options)).toBe(true);
});

test('should cache implicit GET requests', () => {
  const policy = FetchPolicy.cacheAndNetwork;
  const options = {method: null};
  expect(client.shouldUpdateCache(policy, options)).toBe(true);
});

test('should not cache if policy is noCache', () => {
  const policy = FetchPolicy.noCache;
  const options = {method: 'GET'};
  expect(client.shouldUpdateCache(policy, options)).toBe(false);
});

test('should cache GET request if policy is not noCache', () => {
  const policies = POLICIES.filter((p) => p !== FetchPolicy.noCache);
  const options = {method: 'GET'};
  for (const policy of policies) {
    expect(client.shouldUpdateCache(policy, options)).toBe(true);
  }
});

// Client.getCacheKey

test('cache key is verb plus url', () => {
  const verb = 'HEAD';
  const options = {method: verb};
  expect(client.getCacheKey(TEST_URL, options)).toBe(`${verb}+${TEST_URL}`);
});

test('cache key verb null defaults to GET', () => {
  const options = {method: null};
  expect(client.getCacheKey(TEST_URL, options)).toBe(`GET+${TEST_URL}`);
});

test('cache key verb GET is not affected by the null verb fallback', () => {
  const options = {method: 'GET'};
  expect(client.getCacheKey(TEST_URL, options)).toBe(`GET+${TEST_URL}`);
});
