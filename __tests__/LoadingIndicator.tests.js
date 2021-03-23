import {render} from '@testing-library/react-native';
import React from 'react';
import LoadingIndicator from '../src/components/LoadingIndicator';

test('loading indicator renders correctly', () => {
  render(<LoadingIndicator />);
});
