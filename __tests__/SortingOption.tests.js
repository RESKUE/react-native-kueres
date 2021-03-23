import {render} from '@testing-library/react-native';
import React from 'react';
import SearchContext from '../src/search/SearchContext';
import SortingOption from '../src/search/SortingOption';

test('sorting option renders correctly', () => {
  render(
    <SearchContext.Provider
      value={{
        updateSorters: jest.fn(),
        putState: jest.fn(),
        getState: jest.fn(),
      }}>
      <SortingOption />
    </SearchContext.Provider>,
  );
});
