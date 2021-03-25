import {render} from '@testing-library/react-native';
import {Text} from 'react-native';
import React from 'react';
import FancyList from '../src/components/FancyList';

test('fancy list renders correctly without items', () => {
  render(<FancyList />);
});

test('fancy list renders placeholder if there are no items', () => {
  const {getByText} = render(<FancyList placeholder="EMPTY" />);
  expect(getByText('EMPTY')).toBeTruthy();
});

test('fancy list renders correctly with items', () => {
  function Item({data}) {
    return <Text>{data}</Text>;
  }
  const dataList = ['text1', 'text2'];
  render(<FancyList component={Item} data={dataList} />);
});
