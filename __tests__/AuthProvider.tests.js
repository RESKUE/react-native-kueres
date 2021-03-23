import {render, act} from '@testing-library/react-native';
import {View} from 'react-native';
import React from 'react';
import AuthProvider from '../src/auth/AuthProvider';
import AuthService from '../src/auth/AuthService';
import AuthContext from '../src/auth/AuthContext';

test('auth provider renders correctly', () => {
  const authService = new AuthService({});
  render(<AuthProvider authService={authService} />);
});

test('auth provider subscribes to the auth service', () => {
  const authService = new AuthService({});
  render(<AuthProvider authService={authService} />);
  expect(authService.subscribers.length).toBe(1);
});

test('auth provider updates status, token and roles after auth service notification', () => {
  const authService = new AuthService({});
  const {getByTestId} = render(
    <AuthProvider authService={authService}>
      <AuthContext.Consumer>
        {(value) => <View testID="valueContainer" value={value} />}
      </AuthContext.Consumer>
    </AuthProvider>,
  );
  act(() => authService.subscribers[0](true, 'TOKEN', ['helper']));
  const providedValue = getByTestId('valueContainer').props.value;
  expect(providedValue.authStatus).toBe(true);
  expect(providedValue.accessToken).toBe('TOKEN');
  expect(providedValue.clientRoles).toEqual(['helper']);
});

test('auth provider attempts auto login', () => {
  const authService = new AuthService({});
  authService.autoLogin = jest.fn();
  render(<AuthProvider authService={authService} />);
  expect(authService.autoLogin.mock.calls.length).toBe(1);
});
