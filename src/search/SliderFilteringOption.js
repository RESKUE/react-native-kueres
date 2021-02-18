import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Slider from '@react-native-community/slider';

export default function SliderFilteringOption({
  label,
  min,
  max,
  step = 1,
  unit,
  value,
  setValue,
}) {
  const [localValue, setLocalValue] = React.useState(null);

  if (localValue === null && localValue !== value) {
    setLocalValue(value);
  }

  return (
    <View>
      <Text>{label}</Text>
      <Slider
        style={styles.slider}
        value={localValue}
        minimumValue={min}
        maximumValue={max}
        step={step}
        onValueChange={setValue}
      />
      <View style={styles.indicators}>
        <Text>
          {value} {unit}
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
