import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, RadioButton} from 'react-native-paper';

export default function TrileanFilteringOption({
  label,
  options = [],
  value,
  setValue,
}) {
  const buttons = buildButtons(options);

  function onValueChange(newValue) {
    setValue(JSON.parse(newValue));
  }

  return (
    <View style={styles.option}>
      <Text>{label}</Text>
      <RadioButton.Group
        value={JSON.stringify(value)}
        onValueChange={onValueChange}>
        <View style={styles.controls}>{buttons}</View>
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    marginHorizontal: -8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function buildButtons(options) {
  const buttons = [];
  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    buttons.push(
      <View key={`${option.name}-${option.value}`} style={styles.control}>
        <RadioButton value={JSON.stringify(option.value)} />
        <Text>{option.name}</Text>
      </View>,
    );
  }
  return buttons;
}
