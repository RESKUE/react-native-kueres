import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, RadioButton} from 'react-native-paper';
import SearchContext from './SearchContext';

export default function RadioFilteringOption({
  field,
  operation,
  options,
  label,
}) {
  const {updateFilters, putState, getState} = React.useContext(SearchContext);
  const selection = getState(field, null);
  const setSelection = (newSelection) => putState(field, newSelection);
  const buttons = buildButtons(options);

  function onValueChange(newValue) {
    const newSelection = JSON.parse(newValue);
    setSelection(newSelection);
    updateFilters(field, operation, newSelection);
  }

  return (
    <View style={styles.option}>
      <Text>{label}</Text>
      <RadioButton.Group
        value={JSON.stringify(selection)}
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

function buildButtons(options = []) {
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
