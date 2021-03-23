import {render} from '@testing-library/react-native';
import {Text} from 'react-native';
import React from 'react';
import FancyGrid from '../src/components/FancyGrid';

test('fancy grid renders correctly without items', () => {
  render(<FancyGrid />);
});

test('fancy grid renders correctly with items', () => {
  function Item({data}) {
    return <Text>{data}</Text>;
  }
  const dataList = ['text1', 'text2'];
  render(<FancyGrid component={Item} dataList={dataList} />);
});
