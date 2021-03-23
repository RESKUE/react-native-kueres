import AuthClient from '../src/auth/AuthClient';

const TEST_CONFIG = {
  clientId: 'CLIENT_ID',
  scope: 'openid profile email offline_access',
  tokenEndpoint: 'http://127.0.0.1/token',
  endSessionEndpoint: 'http://127.0.0.1/endSession',
};

beforeEach(() => {
  fetch.resetMocks();
});

test('login calls token endpoint with expected body', async () => {
  const client = new AuthClient(TEST_CONFIG);
  await client.login('john', '1234');
  expect(fetch.mock.calls.length).toEqual(1);
  expect(fetch.mock.calls[0][0]).toEqual(TEST_CONFIG.tokenEndpoint);
  const options = fetch.mock.calls[0][1];
  const body = new URLSearchParams(options.body);
  expect(body.get('grant_type')).toBe('password');
  expect(body.get('username')).toBe('john');
  expect(body.get('password')).toBe('1234');
});

test('refresh calls token endpoint with expected body', async () => {
  const client = new AuthClient(TEST_CONFIG);
  await client.refresh('REFRESH_TOKEN');
  expect(fetch.mock.calls.length).toEqual(1);
  expect(fetch.mock.calls[0][0]).toEqual(TEST_CONFIG.tokenEndpoint);
  const options = fetch.mock.calls[0][1];
  const body = new URLSearchParams(options.body);
  expect(body.get('grant_type')).toBe('refresh_token');
  expect(body.get('refresh_token')).toBe('REFRESH_TOKEN');
});

test('logout calls end session endpoint with expected body', async () => {
  const client = new AuthClient(TEST_CONFIG);
  await client.logout('REFRESH_TOKEN');
  expect(fetch.mock.calls.length).toEqual(1);
  expect(fetch.mock.calls[0][0]).toEqual(TEST_CONFIG.endSessionEndpoint);
  const options = fetch.mock.calls[0][1];
  const body = new URLSearchParams(options.body);
  expect(body.get('refresh_token')).toBe('REFRESH_TOKEN');
});

test('request uses expected default params', async () => {
  const client = new AuthClient(TEST_CONFIG);
  await client.request(TEST_CONFIG.tokenEndpoint, {});
  const options = fetch.mock.calls[0][1];
  const body = new URLSearchParams(options.body);
  expect(body.get('client_id')).toBe(TEST_CONFIG.clientId);
  expect(body.get('scope')).toBe(TEST_CONFIG.scope.replace('/ /g', '+'));
});

test('request uses expected custom params', async () => {
  const extraParams = {param1: 'value1', param2: 'value2'};
  const client = new AuthClient(TEST_CONFIG);
  await client.request(TEST_CONFIG.tokenEndpoint, extraParams);
  const options = fetch.mock.calls[0][1];
  const body = new URLSearchParams(options.body);
  expect(body.get('param1')).toBe('value1');
  expect(body.get('param2')).toBe('value2');
});

test('request returns parsed response', async () => {
  const response = {access_token: 'AT', refresh_token: 'RT', id_token: 'IT'};
  fetch.mockOnce(JSON.stringify(response));
  const client = new AuthClient(TEST_CONFIG);
  const result = await client.request('', {});
  expect(result.accessToken).toBe('AT');
  expect(result.refreshToken).toBe('RT');
  expect(result.idToken).toBe('IT');
});

test('tokens default to null', async () => {
  fetch.mockOnce('{}');
  const client = new AuthClient(TEST_CONFIG);
  const result = await client.request('', {});
  expect(result.accessToken).toBeNull();
  expect(result.refreshToken).toBeNull();
  expect(result.idToken).toBeNull();
});

test('result is null if response could not be parsed', async () => {
  fetch.mockOnce('not json');
  const client = new AuthClient(TEST_CONFIG);
  const result = await client.request('', {});
  expect(result).toBeNull();
});

test('a error is thrown if a auth response is not ok', async () => {
  fetch.mockOnce('Internal Server Error', {status: 500});
  const client = new AuthClient(TEST_CONFIG);
  const msg = 'AuthClient Response not ok. (status code 500)';
  expect(client.request('', {})).rejects.toThrow(msg);
});

test('the default params are based on the config', () => {
  const config = {clientId: 'TEST_CLIENT_ID', scope: 'TEST_SCOPE'};
  const client = new AuthClient(config);
  const expectation = {client_id: 'TEST_CLIENT_ID', scope: 'TEST_SCOPE'};
  expect(client.getDefaultParams()).toMatchObject(expectation);
});
