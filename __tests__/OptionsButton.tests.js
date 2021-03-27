import {render} from '@testing-library/react-native';
import {Provider} from 'react-native-paper';
import {Text} from 'react-native';
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
        <OptionsButton title="Sorting" icon="sort">
          <Text>Placeholder child1</Text>
          <Text>Placeholder child2</Text>
        </OptionsButton>
      </SearchContext.Provider>
    </Provider>,
  );
});
