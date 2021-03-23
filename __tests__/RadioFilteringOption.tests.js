import {render} from '@testing-library/react-native';
import React from 'react';
import SearchContext from '../src/search/SearchContext';
import RadioFilteringOption from '../src/search/RadioFilteringOption';

test('radio filtering option renders correctly', () => {
  render(
    <SearchContext.Provider
      value={{
        updateSorters: jest.fn(),
        putState: jest.fn(),
        getState: jest.fn(),
      }}>
      <RadioFilteringOption />
    </SearchContext.Provider>,
  );
});
