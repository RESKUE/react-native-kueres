import {render, within, fireEvent} from '@testing-library/react-native';
import {Provider, DarkTheme} from 'react-native-paper';
import React from 'react';
import FancyToggle, {FancyToggleContext} from '../src/components/FancyToggle';

test('fancy toggle row renders correctly', () => {
  render(<FancyToggle.Row />);
});

test('fancy toggle row renders correctly with dark theme', () => {
  render(
    <Provider theme={DarkTheme}>
      <FancyToggle.Row initialValue={true}>
        <FancyToggle label="Yes" value={true} />
        <FancyToggle label="No" value={false} />
      </FancyToggle.Row>
    </Provider>,
  );
});

test('fancy toggle renders correctly', () => {
  const selection = jest.fn();
  const updateSelection = jest.fn();
  render(
    <FancyToggleContext.Provider value={{selection, updateSelection}}>
      <FancyToggle />
    </FancyToggleContext.Provider>,
  );
});

test('initial selection coressponds to the initial value', async () => {
  const {getByA11yState} = render(
    <FancyToggle.Row initialValue={true}>
      <FancyToggle label="Yes" value={true} />
      <FancyToggle label="No" value={false} />
    </FancyToggle.Row>,
  );
  const selectedToggle = within(getByA11yState({selected: true}));
  expect(selectedToggle.getByText('Yes')).toBeTruthy();
});

test('pressing a button changes the selection', () => {
  const {getByA11yState, getByText} = render(
    <FancyToggle.Row initialValue={true}>
      <FancyToggle label="Yes" value={true} />
      <FancyToggle label="No" value={false} />
    </FancyToggle.Row>,
  );
  expect(
    within(getByA11yState({selected: true})).getByText('Yes'),
  ).toBeTruthy();
  fireEvent.press(getByText('No'));
  expect(within(getByA11yState({selected: true})).getByText('No')).toBeTruthy();
});

test('callback is only called on selection change', () => {
  const onSelectionChanged = jest.fn();
  const {getByText} = render(
    <FancyToggle.Row
      initialValue={true}
      onSelectionChanged={onSelectionChanged}>
      <FancyToggle label="Yes" value={true} />
      <FancyToggle label="No" value={false} />
    </FancyToggle.Row>,
  );
  fireEvent.press(getByText('Yes'));
  expect(onSelectionChanged.mock.calls.length).toBe(0);
  fireEvent.press(getByText('No'));
  expect(onSelectionChanged.mock.calls.length).toBe(1);
  fireEvent.press(getByText('No'));
  expect(onSelectionChanged.mock.calls.length).toBe(1);
});
