import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import SearchContext from '../src/search/SearchContext';
import SearchBar from '../src/search/SearchBar';

test('search bar renders correctly', () => {
  renderer.create(
    <SearchContext.Provider
      value={{
        updateSorters: jest.fn(),
        putState: jest.fn(),
        getState: jest.fn(),
      }}>
      <SearchBar />
    </SearchContext.Provider>,
  );
});