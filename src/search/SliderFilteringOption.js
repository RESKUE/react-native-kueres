import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Slider from '@react-native-community/slider';

export default function SliderFilteringOption({
  updateFilters,
  field,
  operation,
  min,
  max,
  unit,
  step = 1,
  label,
}) {
  const [selection, setSelection] = React.useState(null);

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
