import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import FancyToggle, {FancyToggleContext} from '../src/components/FancyToggle';

test('fancy toggle row renders correctly', () => {
  renderer.create(<FancyToggle.Row />);
});

test('fancy toggle renders correctly', () => {
  const selection = jest.fn();
  const updateSelection = jest.fn();
  renderer.create(
    <FancyToggleContext.Provider value={{selection, updateSelection}}>
      <FancyToggle />
    </FancyToggleContext.Provider>,
  );
});
