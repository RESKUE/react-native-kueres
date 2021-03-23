import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import React from 'react';
import FilteringButton from '../src/search/FilteringButton';

test('options button renders correctly', () => {
  render(
    <Provider>
      <FilteringButton />
    </Provider>,
  );
});
