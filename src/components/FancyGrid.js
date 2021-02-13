import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function FancyGrid({
  dataList = [],
  component,
  columns = 3,
  gap = 16,
}) {
  const Component = component;
  const items = [];
  const excessGapAdjustment = {marginTop: -gap, marginRight: -gap};
  const itemWidth = {width: `${100 / columns}%`};
  const itemGap = {paddingTop: gap, paddingRight: gap};

  for (let index = 0; index < dataList.length; index++) {
    const data = dataList[index];
    items.push(
      <View style={[itemWidth, itemGap]} key={`grid-item-${index}`}>
        <Component data={data} />
      </View>,
    );
  }

  return <View style={[styles.grid, excessGapAdjustment]}>{items}</View>;
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
