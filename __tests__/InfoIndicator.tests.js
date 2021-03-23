import {render} from '@testing-library/react-native';
import React from 'react';
import InfoIndicator from '../src/components/InfoIndicator';

test('info indicator renders correctly', () => {
  render(<InfoIndicator icon="camera" text="Take a picture!" />);
});
