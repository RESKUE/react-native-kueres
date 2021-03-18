import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import AuthProvider from '../src/auth/AuthProvider';

test('auth provider renders correctly', () => {
  renderer.create(<AuthProvider />);
});
