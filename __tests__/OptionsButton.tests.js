import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import React from 'react';
import SearchContext from '../src/search/SearchContext';
import OptionsButton from '../src/search/OptionsButton';

test('options button renders correctly', () => {
  render(
    <Provider>
      <SearchContext.Provider
        value={{
          updateSorters: jest.fn(),
          putState: jest.fn(),
          getState: jest.fn(),
        }}>
        <OptionsButton />
      </SearchContext.Provider>
      ,
    </Provider>,
  );
});
