import Client from '../src/network/Client';
import FetchPolicy from '../src/network/FetchPolicy';
import FormData from 'form-data';

const POLICIES = Object.values(FetchPolicy);
const TEST_URL = 'https://example.com/?lang=en#hash';
const DEFAULT_HEADERS = {authorization: 'Bearer TOKEN'};
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

// Client.prepareOptions

test('options headers can override default headers', () => {
  const defaultHeaders = {authorization: 'default'};
  const options = {method: 'GET', headers: {authorization: 'overridden'}};
  const client = new Client(null, defaultHeaders);
  expect(client.prepareOptions(options)).toMatchObject(options);
});

test('options headers can extend default headers2', () => {
  const defaultHeaders = {header1: 'default'};
  const options = {method: 'GET', headers: {header2: 'new'}};
  const expectedOptions = {
    method: 'GET',
    headers: {header1: 'default', header2: 'new'},
  };
  const client = new Client(null, defaultHeaders);
  expect(client.prepareOptions(options)).toMatchObject(expectedOptions);
});

test('options headers can partly override default headers', () => {
  const defaultHeaders = {header1: 'default1', header2: 'default2'};
  const options = {method: 'GET', headers: {header1: 'overridden'}};
  const expectedOptions = {
    method: 'GET',
    headers: {header1: 'overridden', header2: 'default2'},
  };
  const client = new Client(null, defaultHeaders);
  expect(client.prepareOptions(options)).toMatchObject(expectedOptions);
});

test('options can be empty', () => {
  const client = new Client(null, DEFAULT_HEADERS);
  const options = {};
  const expected = {headers: DEFAULT_HEADERS};
  expect(client.prepareOptions(options)).toMatchObject(expected);
});

test('options can be null', () => {
  const client = new Client(null, DEFAULT_HEADERS);
  const options = null;
  const expected = {headers: DEFAULT_HEADERS};
  expect(client.prepareOptions(options)).toMatchObject(expected);
});

test('default headers can be null', () => {
  const defaultHeaders = null;
  const client = new Client(null, defaultHeaders);
  const options = {method: 'GET'};
  expect(client.prepareOptions(options)).toMatchObject(options);
});

test('default headers can be empty', () => {
  const defaultHeaders = {};
  const client = new Client(null, defaultHeaders);
  const options = {method: 'GET'};
  expect(client.prepareOptions(options)).toMatchObject(options);
});
