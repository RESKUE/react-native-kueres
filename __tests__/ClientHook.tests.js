import {act, renderHook} from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import useClient from '../src/network/ClientHook';
import AuthContext from '../src/auth/AuthContext';
import FetchPolicy from '../src/network/FetchPolicy';

test('default headers are empty by default', () => {
  const {result} = renderHook(() => useClient());
  expect(result.current.client.defaultHeaders).toMatchObject({});
});

test('authenticated clients have a default authorization header', () => {
  const expectedToken = 'TOKEN';
  const expectedDefaultHeaders = {Authorization: `Bearer ${expectedToken}`};
  const wrapper = ({children}) => (
    <AuthContext.Provider value={{accessToken: expectedToken}}>
      {children}
    </AuthContext.Provider>
  );
  const {result} = renderHook(() => useClient({authenticated: true}), {
    wrapper,
  });
  expect(result.current.client.defaultHeaders).toMatchObject(
    expectedDefaultHeaders,
  );
});

test('cache and network responses update the result state', async () => {
  const cacheData = {key: 'cache'};
  AsyncStorage.getItem = jest.fn().mockResolvedValue(JSON.stringify(cacheData));

  const networkData = {key: 'network'};
  fetch.mockOnce(JSON.stringify(networkData));

  const {result, waitForNextUpdate} = renderHook(() => useClient());
  expect(result.current.result).toBeNull();

  await act(async () => {
    result.current.client.request(
      'http://127.0.0.1/api/entity',
      null,
      FetchPolicy.cacheAndNetwork,
    );
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toMatchObject({key: 'network'});
});

test('result data is set to null if the client yields empty network data', async () => {
  fetch.mockOnce(null);

  const {result, waitForNextUpdate} = renderHook(() => useClient());
  expect(result.current.result).toBeNull();

  await act(async () => {
    result.current.client.request(
      'http://127.0.0.1/api/entity',
      null,
      FetchPolicy.networkOnly,
    );
    await waitForNextUpdate();
  });

  expect(result.current.result.data).toBeNull();
});
