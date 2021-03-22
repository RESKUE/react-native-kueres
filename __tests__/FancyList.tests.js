import 'react-native';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import FancyList from '../src/components/FancyList';

test('fancy list renders correctly without items', () => {
  renderer.create(<FancyList />);
});

test('fancy list renders correctly with items', () => {
  function Item({data}) {
    return <Text>{data}</Text>;
  }
  const dataList = ['text1', 'text2'];
  renderer.create(<FancyList component={Item} data={dataList} />);
});
