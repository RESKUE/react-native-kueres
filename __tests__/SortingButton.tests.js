import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import React from 'react';
import SortingButton from '../src/search/SortingButton';

test('sorting button renders correctly', () => {
  render(
    <Provider>
      <SortingButton />
    </Provider>,
  );
});
