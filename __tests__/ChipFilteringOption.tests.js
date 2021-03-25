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
        getState: jest.fn().mockReturnValue([1]),
      }}>
      <ChipFilteringOption
        label="Select option"
        field="field"
        operation="in"
        options={[
          {name: 'All', value: null},
          {name: 'Option1', value: 1},
          {name: 'Option2', value: 2},
        ]}
      />
    </SearchContext.Provider>,
  );
});
