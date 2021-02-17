import Client from '../src/network/Client';
import FetchPolicy from '../src/network/FetchPolicy';

const POLICIES = Object.values(FetchPolicy);
const TEST_URL = 'https://example.com/?lang=en#hash';
const DEFAULT_OPTIONS = {
  method: 'HEAD',
  headers: {authorization: 'Bearer TOKEN'},
};
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

// Client.compileOptions

test('options can completely override default options', () => {
  const defaultOptions = {method: 'HEAD', headers: {authorization: 'test'}};
  const options = {method: 'GET', headers: {authorization: 'secret'}};
  const client = new Client(null, defaultOptions);
  expect(client.compileOptions(options)).toMatchObject(options);
});

test('options can partly override default options', () => {
  const defaultOptions = {method: 'HEAD', headers: {authorization: 'test'}};
  const options = {method: 'GET'};
  const expectedOptions = {method: 'GET', headers: {authorization: 'test'}};
  const client = new Client(null, defaultOptions);
  expect(client.compileOptions(options)).toMatchObject(expectedOptions);
});

test('default options can partly override nested options', () => {
  const defaultOptions = {headers: {a: 'a', b: 'b'}};
  const options = {headers: {a: 'c'}};
  const expectedOptions = {headers: {a: 'c', b: 'b'}};
  const client = new Client(null, defaultOptions);
  expect(client.compileOptions(options)).toMatchObject(expectedOptions);
});

test('options can be empty', () => {
  const client = new Client(null, DEFAULT_OPTIONS);
  const options = {};
  expect(client.compileOptions(options)).toMatchObject(DEFAULT_OPTIONS);
});

test('options can be null', () => {
  const client = new Client(null, DEFAULT_OPTIONS);
  const options = null;
  expect(client.compileOptions(options)).toMatchObject(DEFAULT_OPTIONS);
});

test('default options can be null', () => {
  const defaultOptions = null;
  const client = new Client(null, defaultOptions);
  const options = {method: 'GET'};
  expect(client.compileOptions(options)).toMatchObject(options);
});

test('default options can be empty', () => {
  const defaultOptions = {};
  const client = new Client(null, defaultOptions);
  const options = {method: 'GET'};
  expect(client.compileOptions(options)).toMatchObject(options);
});
