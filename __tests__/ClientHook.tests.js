import {renderHook} from '@testing-library/react-hooks';
import React from 'react';
import useClient from '../src/network/ClientHook';
import AuthContext from '../src/auth/AuthContext';

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
