import {render} from '@testing-library/react-native';
import React from 'react';
import SearchContext from '../src/search/SearchContext';
import SliderFilteringOption from '../src/search/SliderFilteringOption';

test('slider filtering option renders correctly', () => {
  render(
    <SearchContext.Provider
      value={{
        updateSorters: jest.fn(),
        putState: jest.fn(),
        getState: jest.fn(),
      }}>
      <SliderFilteringOption />
    </SearchContext.Provider>,
  );
});
