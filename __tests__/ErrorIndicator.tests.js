import {render} from '@testing-library/react-native';
import React from 'react';
import ErrorIndicator from '../src/components/ErrorIndicator';

test('error indicator renders correctly', () => {
  render(<ErrorIndicator />);
});
