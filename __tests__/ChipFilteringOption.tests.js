import {render} from '@testing-library/react-native';
import React from 'react';
import SearchContext from '../src/search/SearchContext';
import ChipFilteringOption from '../src/search/ChipFilteringOption';

test('chip filtering option renders correctly', () => {
  render(
    <SearchContext.Provider
      value={{
        updateSorters: jest.fn(),
        putState: jest.fn(),
        getState: jest.fn(),
      }}>
      <ChipFilteringOption options={[]} />
    </SearchContext.Provider>,
  );
});
