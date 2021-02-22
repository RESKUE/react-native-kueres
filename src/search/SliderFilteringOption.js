import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import SearchContext from './SearchContext';

export default function SliderFilteringOption({
  field,
  operation,
  min,
  max,
  unit,
  step = 1,
  label,
}) {
  const {updateFilters, putState, getState} = React.useContext(SearchContext);
  const selection = getState(field, null);
  const setSelection = (newSelection) => putState(field, newSelection);

  function onValueChange(value) {
    setSelection(value);
    updateFilters(field, operation, value);
  }

  return (
    <View>
      <Text>{label}</Text>
      <Slider
        style={styles.slider}
        value={selection}
        minimumValue={min}
        maximumValue={max}
        step={step}
        onValueChange={onValueChange}
      />
      <View style={styles.indicators}>
        <Text>
          {selection} {unit}
        </Text>
        <Text>
          {max} {unit}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slider: {
    marginTop: 4,
    marginHorizontal: -16,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
