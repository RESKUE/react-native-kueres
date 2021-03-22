import 'react-native';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import FancyGrid from '../src/components/FancyGrid';

test('fancy grid renders correctly without items', () => {
  renderer.create(<FancyGrid />);
});

test('fancy grid renders correctly with items', () => {
  function Item({data}) {
    return <Text>{data}</Text>;
  }
  const dataList = ['text1', 'text2'];
  renderer.create(<FancyGrid component={Item} dataList={dataList} />);
});
