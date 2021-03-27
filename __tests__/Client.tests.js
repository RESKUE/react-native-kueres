import AsyncStorage from '@react-native-async-storage/async-storage';
import Cache from '../src/network/Cache';
import Client from '../src/network/Client';
import FetchPolicy from '../src/network/FetchPolicy';

const POLICIES = Object.values(FetchPolicy);
const TEST_URL = 'https://example.com/?lang=en#hash';
const DEFAULT_HEADERS = {authorization: 'Bearer TOKEN'};

beforeEach(() => {
  fetch.resetMocks();
});

// Client.shouldYieldCache

test('should yield cache for cache policies', () => {
  const client = new Client(null);
  expect(client.shouldYieldCache(FetchPolicy.cacheOnly, null)).toBe(true);
  expect(client.shouldYieldCache(FetchPolicy.cacheFirst, null)).toBe(true);
  expect(client.shouldYieldCache(FetchPolicy.cacheAndNetwork, null)).toBe(true);
});

test('should not yield cache for network only policies', () => {
  const client = new Client(null);
  expect(client.shouldYieldCache(FetchPolicy.networkOnly, null)).toBe(false);
  expect(client.shouldYieldCache(FetchPolicy.noCache, null)).toBe(false);
});

// Client.shouldYieldNetwork

test('cacheFirst yields from network if no cache data is present', () => {
  const client = new Client(null);
  const policy = FetchPolicy.cacheFirst;
  expect(client.shouldYieldNetwork(policy, null)).toBe(true);
});

test('cacheFirst does not yield network if cache data is present', () => {
  const client = new Client(null);
  const policy = FetchPolicy.cacheFirst;
  expect(client.shouldYieldNetwork(policy, {})).toBe(false);
});

test('cacheOnly prevents yielding from network', () => {
  const client = new Client(null);
  const policy = FetchPolicy.cacheOnly;
  expect(client.shouldYieldNetwork(policy, null)).toBe(false);
  expect(client.shouldYieldNetwork(policy, {})).toBe(false);
});

test('network policies cause network yield', () => {
  const client = new Client(null);
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
  const client = new Client(null);
  const policy = FetchPolicy.cacheAndNetwork;
  const options = {method: 'GET'};
  expect(client.shouldUpdateCache(policy, options)).toBe(true);
});

test('should cache implicit GET requests', () => {
  const client = new Client(null);
  const policy = FetchPolicy.cacheAndNetwork;
  const options = {method: null};
  expect(client.shouldUpdateCache(policy, options)).toBe(true);
});

test('should not cache if policy is noCache', () => {
  const client = new Client(null);
  const policy = FetchPolicy.noCache;
  const options = {method: 'GET'};
  expect(client.shouldUpdateCache(policy, options)).toBe(false);
});

test('should cache GET request if policy is not noCache', () => {
  const client = new Client(null);
  const policies = POLICIES.filter((p) => p !== FetchPolicy.noCache);
  const options = {method: 'GET'};
  for (const policy of policies) {
    expect(client.shouldUpdateCache(policy, options)).toBe(true);
  }
});

// Client.getCacheKey

test('cache key is verb plus url', () => {
  const client = new Client(null);
  const verb = 'HEAD';
  const options = {method: verb};
  expect(client.getCacheKey(TEST_URL, options)).toBe(`${verb}+${TEST_URL}`);
});

test('cache key verb null defaults to GET', () => {
  const client = new Client(null);
  const options = {method: null};
  expect(client.getCacheKey(TEST_URL, options)).toBe(`GET+${TEST_URL}`);
});

test('cache key verb GET is not affected by the null verb fallback', () => {
  const client = new Client(null);
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

// Client.request

test('request yields network and cache responses', async () => {
  const cacheData = {key: 'cache'};
  const networkData = {key: 'network'};

  AsyncStorage.getItem = jest.fn().mockResolvedValue(JSON.stringify(cacheData));
  fetch.mockOnce(JSON.stringify(networkData));

  const client = new Client(new Cache());
  const callback = jest.fn();
  client.subscribe(callback);

  await client.request(
    'http://127.0.0.1/api/entity',
    null,
    FetchPolicy.cacheAndNetwork,
  );

  expect(callback.mock.calls.length).toBe(2);
  expect(callback.mock.calls[0][0].data).toMatchObject(cacheData);
  expect(callback.mock.calls[1][0].data).toMatchObject(networkData);
});

test('request should return network data if there is network data', async () => {
  const cacheData = {key: 'cache'};
  const networkData = {key: 'network'};

  AsyncStorage.getItem = jest.fn().mockResolvedValue(JSON.stringify(cacheData));
  fetch.mockOnce(JSON.stringify(networkData));

  const client = new Client(new Cache());
  const result = await client.request(
    'http://127.0.0.1/api/entity',
    null,
    FetchPolicy.cacheAndNetwork,
  );

  expect(result.data).toMatchObject(networkData);
});

test('request should return network errors if there are', async () => {
  const cacheData = {key: 'cache'};
  AsyncStorage.getItem = jest.fn().mockResolvedValue(JSON.stringify(cacheData));

  fetch.mockOnce('Internal Server Error', {status: 500});

  const client = new Client(new Cache());
  const result = await client.request(
    'http://127.0.0.1/api/entity',
    null,
    FetchPolicy.cacheAndNetwork,
  );

  expect(result.error.message).toEqual(expect.stringContaining('500'));
});

test('request should return existing cache errors there is no network data or errors', async () => {
  AsyncStorage.getItem = jest.fn().mockRejectedValue(new Error('Cache error'));

  const client = new Client(new Cache());
  const result = await client.request(
    'http://127.0.0.1/api/entity',
    null,
    FetchPolicy.cacheOnly,
  );

  expect(result.error.message).toBe('Cache error');
});

test('request should return cache data if there is no network data', async () => {
  const cacheData = {key: 'cache'};
  AsyncStorage.getItem = jest.fn().mockResolvedValue(JSON.stringify(cacheData));

  const client = new Client(new Cache());
  const result = await client.request(
    'http://127.0.0.1/api/entity',
    null,
    FetchPolicy.cacheOnly,
  );

  expect(result.data).toMatchObject(cacheData);
});

test('request should return null if there is not cache or network data/errors', async () => {
  AsyncStorage.getItem = jest.fn().mockResolvedValue(null);

  const client = new Client(new Cache());
  const result = await client.request(
    'http://127.0.0.1/api/entity',
    null,
    FetchPolicy.cacheOnly,
  );

  expect(result).toBeNull();
});

test('request updates cache with successful network response', async () => {
  const networkData = {key: 'network'};
  fetch.mockOnce(JSON.stringify(networkData));

  AsyncStorage.setItem = jest.fn();

  const client = new Client(new Cache());
  await client.request(
    'http://127.0.0.1/api/entity',
    null,
    FetchPolicy.cacheAndNetwork,
  );

  expect(AsyncStorage.setItem.mock.calls.length).toBe(1);
});

test('request should not update cache on noCache policy', async () => {
  const networkData = {key: 'network'};
  fetch.mockOnce(JSON.stringify(networkData));

  AsyncStorage.setItem = jest.fn();

  const client = new Client(new Cache());
  await client.request(
    'http://127.0.0.1/api/entity',
    null,
    FetchPolicy.noCache,
  );

  expect(AsyncStorage.setItem.mock.calls.length).toBe(0);
});

test('request should send default headers', async () => {
  fetch.mockOnce('{}');

  const client = new Client(new Cache(), {Authorization: 'Bearer TOKEN'});
  await client.request(
    'http://127.0.0.1/api/entity',
    null,
    FetchPolicy.networkOnly,
  );

  expect(fetch.mock.calls.length).toBe(1);
  expect(fetch.mock.calls[0][1].headers).toMatchObject({
    Authorization: 'Bearer TOKEN',
  });
});

test('request should not send headers if there are none', async () => {
  fetch.mockOnce('{}');

  const client = new Client(new Cache());
  await client.request(
    'http://127.0.0.1/api/entity',
    null,
    FetchPolicy.networkOnly,
  );

  expect(fetch.mock.calls.length).toBe(1);
  expect(fetch.mock.calls[0][1].headers).toBe(undefined);
});
