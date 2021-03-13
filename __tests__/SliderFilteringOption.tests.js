import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import SearchContext from '../src/search/SearchContext';
import SliderFilteringOption from '../src/search/SliderFilteringOption';

test('slider filtering option renders correctly', () => {
  renderer.create(
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
