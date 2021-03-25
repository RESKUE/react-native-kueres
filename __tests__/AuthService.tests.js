import AuthService from '../src/auth/AuthService';

const TEST_CONFIG = {
  clientId: 'reskue',
  scope: 'openid profile email offline_access',
  tokenEndpoint: 'http://127.0.0.1/token',
  endSessionEndpoint: 'http://127.0.0.1/endSession',
};

const TEST_REFRESH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjYWVhOTQ0Ni02NjY5LTRlZTUtYWZjZC1iZTY3MGU5MTUxZWEifQ.eyJleHAiOjE2MTY2NDI5MzIsImlhdCI6MTYxNjY0MTEzMiwianRpIjoiNjZkZDU4N2YtM2M0Yy00MTYwLTg4YTUtMWVhNTZjMDg2ZWMyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1NDM2L2F1dGgvcmVhbG1zL3Jlc2t1ZSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTQzNi9hdXRoL3JlYWxtcy9yZXNrdWUiLCJzdWIiOiI5OGY5OTUyYi03ZTFhLTQ5ODktYTAzNS0wYjAyMDNiMWZmYTgiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoicmVza3VlIiwic2Vzc2lvbl9zdGF0ZSI6ImVlM2Y2Njg4LTM5ODMtNGQ0NS04YjY0LTE1NTViOWFiMzY5YyIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSJ9.WDu17GHh6523fZ6wUFiUAHzkIq9sY65qAluy8j1JBkA';

const TEST_ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzVkU4bzNwb2E3LTlIWkpFYldQM0htdjNES3ZJX2NjcG5MYlhaSFRRNnVjIn0.eyJleHAiOjE2MTY2NDE0MzIsImlhdCI6MTYxNjY0MTEzMiwianRpIjoiMGZjNmVjMjMtYmMwOC00M2E2LTkxMWEtOTUwNzAxNWFkNGU3IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1NDM2L2F1dGgvcmVhbG1zL3Jlc2t1ZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5OGY5OTUyYi03ZTFhLTQ5ODktYTAzNS0wYjAyMDNiMWZmYTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZXNrdWUiLCJzZXNzaW9uX3N0YXRlIjoiZWUzZjY2ODgtMzk4My00ZDQ1LThiNjQtMTU1NWI5YWIzNjljIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIiwiaHR0cDovL2xvY2FsaG9zdDo4MDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJyZXNrdWUtYWRtaW5pc3RyYXRvciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZXNrdWUiOnsicm9sZXMiOlsiYWRtaW5pc3RyYXRvciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiJ9.YFQibJE7eTdg20_IEAeTkIlYxVR2ByPLMJBAn6X7cbu-LlcCjb9Kq-AJCevHSVF1A1KlMSB-Lln1z8HDv_SMwgXJwnDNUNM6JTjUr-GzjpkkDlxkc8pEH8zYG9MLCSvlTDnA7fzoL6BcYWuCRdgsmeqgvV_JYWSI831Cg0SZWcjYXxiTlbOSEG7CeCswcBgur0WwI2leqOgRBXfsifui9bWo07TGU2L6FhpX4KYtItzrTR5pxPtGZ9fjGvYb-mTMXEtOgDj_7DNGzAnYou60DJJZUTbWs3npFI8sV-itsJtArKLkpQhNNTez24OXdcUIDnLeZtOupL_LQ7eE6LIQJw';

const TOKEN_WITH_EXP_42 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQyfQ.p0Lyt53GnJP1_eDaJ1rRSmkwq4ktBccFd7B0HFBNECc';

const TOKEN_WITH_FUTURE_EXP =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjk5OTk5OTk5OTk5fQ.AncZldMI-eQ-HbhXqdqSG1Z-EtsGICeb6qkTijTwvEA';

test('access token is requested from storage', async () => {
  const storage = {getToken: jest.fn()};
  storage.getToken.mockReturnValue('TOKEN');
  const service = new AuthService(TEST_CONFIG, storage);
  const token = await service.getAccessToken();
  expect(storage.getToken.mock.calls.length).toBe(1);
  // TODO: check first param
  expect(token).toBe('TOKEN');
});

test('autoLogin emits falsy values if there is no refresh token', async () => {
  const storage = {getToken: jest.fn()};
  storage.getToken.mockReturnValue(null);

  const subscriber = jest.fn();
  const service = new AuthService(TEST_CONFIG, storage);
  service.subscribe(subscriber);
  await service.autoLogin();

  expect(subscriber.mock.calls.length).toBe(1);
  expect(subscriber.mock.calls[0][0]).toBe(false); // loginStatus
  expect(subscriber.mock.calls[0][1]).toBeNull(); // accessToken
  expect(subscriber.mock.calls[0][2]).toEqual([]); // clientRoles
});

test('autoLogin refreshes existing refresh tokens', async () => {
  const storage = {getToken: jest.fn(), putToken: jest.fn()};
  storage.getToken.mockReturnValue(TEST_REFRESH_TOKEN);

  const service = new AuthService(TEST_CONFIG, storage);
  service.client.refresh = jest.fn().mockResolvedValue({});
  await service.autoLogin();

  expect(service.client.refresh.mock.calls.length).toBe(1);
  expect(service.client.refresh.mock.calls[0][0]).toBe(TEST_REFRESH_TOKEN);
});

test('login returns and emits truthy values on login success', async () => {
  const storage = {putToken: jest.fn()};
  const service = new AuthService(TEST_CONFIG, storage);
  service.client.login = jest.fn().mockResolvedValue({
    accessToken: TEST_ACCESS_TOKEN,
    refreshToken: TEST_REFRESH_TOKEN,
  });

  const subscriber = jest.fn();
  service.subscribe(subscriber);
  const loginStatus = await service.login('username', 'password');

  expect(loginStatus).toBe(true);
  expect(subscriber.mock.calls.length).toBe(1);
  expect(subscriber.mock.calls[0][0]).toBe(true); // loginStatus
  expect(subscriber.mock.calls[0][1]).toBe(TEST_ACCESS_TOKEN); // accessToken
  expect(subscriber.mock.calls[0][2]).toEqual(['administrator']); // clientRoles
});

test('login returns and emits falsy values on login failure', async () => {
  const service = new AuthService(TEST_CONFIG, null);
  service.client.login = jest.fn().mockRejectedValue(new Error('Login failed'));

  // Turn of console log for this test, otherwise the output will contain
  // our planed "Login failed" error, which might confuse testers.
  jest.spyOn(console, 'log').mockImplementation(() => {});

  const subscriber = jest.fn();
  service.subscribe(subscriber);
  const loginStatus = await service.login('username', 'password');

  expect(loginStatus).toBe(false);
  expect(subscriber.mock.calls.length).toBe(1);
  expect(subscriber.mock.calls[0][0]).toBe(false); // loginStatus
  expect(subscriber.mock.calls[0][1]).toBe(null); // accessToken
  expect(subscriber.mock.calls[0][2]).toEqual([]); // clientRoles
});

test('refresh returns and emits truthy values on success', async () => {
  const storage = {getToken: jest.fn(), putToken: jest.fn()};
  storage.getToken.mockReturnValue(TEST_REFRESH_TOKEN);

  const service = new AuthService(TEST_CONFIG, storage);
  service.client.refresh = jest.fn().mockResolvedValue({
    accessToken: TEST_ACCESS_TOKEN,
    refreshToken: TEST_REFRESH_TOKEN,
  });

  const subscriber = jest.fn();
  service.subscribe(subscriber);
  await service.refresh();

  expect(subscriber.mock.calls.length).toBe(1);
  expect(subscriber.mock.calls[0][0]).toBe(true); // loginStatus
  expect(subscriber.mock.calls[0][1]).toBe(TEST_ACCESS_TOKEN); // accessToken
  expect(subscriber.mock.calls[0][2]).toEqual(['administrator']); // clientRoles
});

test('refresh returns and emits falsy values on failure', async () => {
  const storage = {getToken: jest.fn()};
  storage.getToken.mockReturnValue(TEST_REFRESH_TOKEN);

  const service = new AuthService(TEST_CONFIG, storage);
  service.client.login = jest
    .fn()
    .mockRejectedValue(new Error('Refresh failed'));
  jest.spyOn(console, 'log').mockImplementation(() => {});

  const subscriber = jest.fn();
  service.subscribe(subscriber);
  await service.refresh();

  expect(subscriber.mock.calls.length).toBe(1);
  expect(subscriber.mock.calls[0][0]).toBe(false); // loginStatus
  expect(subscriber.mock.calls[0][1]).toBe(null); // accessToken
  expect(subscriber.mock.calls[0][2]).toEqual([]); // clientRoles
});

test('logout clears token even on client error', async () => {
  const storage = {getToken: jest.fn(), clearTokens: jest.fn()};
  storage.getToken.mockRejectedValue(new Error('Storage failed'));
  jest.spyOn(console, 'log').mockImplementation(() => {});

  const service = new AuthService(TEST_CONFIG, storage);
  await service.logout();

  expect(storage.clearTokens.mock.calls.length).toBe(1);
});

test('logout notifies logout even on client error', async () => {
  const storage = {getToken: jest.fn(), clearTokens: jest.fn()};
  storage.getToken.mockRejectedValue(new Error('Storage failed'));
  jest.spyOn(console, 'log').mockImplementation(() => {});

  const service = new AuthService(TEST_CONFIG, storage);
  const subscriber = jest.fn();
  service.subscribe(subscriber);
  await service.logout();

  expect(subscriber.mock.calls.length).toBe(1);
  expect(subscriber.mock.calls[0][0]).toBe(false); // loginStatus
  expect(subscriber.mock.calls[0][1]).toBe(null); // accessToken
  expect(subscriber.mock.calls[0][2]).toEqual([]); // clientRoles
});

test('logout calls client with refresh token', async () => {
  const storage = {getToken: jest.fn(), clearTokens: jest.fn()};
  storage.getToken.mockReturnValue(TEST_REFRESH_TOKEN);

  const service = new AuthService(TEST_CONFIG, storage);
  service.client.logout = jest.fn();
  await service.logout();

  expect(service.client.logout.mock.calls.length).toBe(1);
  expect(service.client.logout.mock.calls[0][0]).toBe(TEST_REFRESH_TOKEN);
});

test('decodeToken ignores null', () => {
  const service = new AuthService(TEST_CONFIG, null);
  expect(service.decodeToken(null)).toBe(null);
});

test('decodeToken can decode tokens', () => {
  const service = new AuthService(TEST_CONFIG, null);
  const decoded = service.decodeToken(TEST_ACCESS_TOKEN);
  expect(decoded.typ).toBe('Bearer');
});

test('getExpiryDate ignores null', () => {
  const service = new AuthService(TEST_CONFIG, null);
  expect(service.getExpiryDate(null)).toBe(null);
});

test('getExpiryDate ignores tokens without expiry', () => {
  const tokenWithoutExpiry =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ';
  const service = new AuthService(TEST_CONFIG, null);
  expect(service.getExpiryDate(tokenWithoutExpiry)).toBe(null);
});

test('getExpiryDate returns the tokens exp attribute', () => {
  const service = new AuthService(TEST_CONFIG, null);
  const expiry = service.getExpiryDate(TOKEN_WITH_EXP_42);
  expect(expiry).toBe(42);
});

test('isExpired treats null tokens as expired', () => {
  const service = new AuthService(TEST_CONFIG, null);
  expect(service.isExpired(null)).toBe(true);
});

test('isExpired treats expired tokens as expired', () => {
  const service = new AuthService(TEST_CONFIG, null);
  expect(service.isExpired(TOKEN_WITH_EXP_42)).toBe(true);
});

test('isExpired treats future tokens as not expired', () => {
  const service = new AuthService(TEST_CONFIG, null);
  expect(service.isExpired(TOKEN_WITH_FUTURE_EXP)).toBe(false);
});
