import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Chip} from 'react-native-paper';

export default function ChipFilteringOption({
  label,
  options,
  values = [],
  setValues,
}) {
  const chips = buildChips(options, values, setValues);
  return (
    <View>
      <Text>{label}</Text>
      <View style={styles.chips}>{chips}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginTop: 8,
    marginRight: 4,
  },
});

function buildChips(options, values, setValues) {
  const chips = [];
  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    const selected = values.includes(option.value);

    function onPress() {
      if (values.includes(option.value)) {
        const newValue = values.filter((value) => value !== option.value);
        setValues(newValue);
      } else {
        const newValue = values.concat(option.value);
        setValues(newValue);
      }
    }

    chips.push(
      <Chip
        style={styles.chip}
        key={`${option.name}-${option.value}`}
        selected={selected}
        onPress={onPress}>
        {option.name}
      </Chip>,
    );
  }
  return chips;
}
