import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import SearchContext from '../src/search/SearchContext';
import OptionsButton from '../src/search/OptionsButton';

test('options button renders correctly', () => {
  renderer.create(
    <SearchContext.Provider
      value={{
        updateSorters: jest.fn(),
        putState: jest.fn(),
        getState: jest.fn(),
      }}>
      <OptionsButton />
    </SearchContext.Provider>,
  );
});
