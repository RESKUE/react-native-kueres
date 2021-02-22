import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Chip} from 'react-native-paper';
import SearchContext from './SearchContext';

export default function ChipFilteringOption({
  field,
  operation,
  options,
  label,
}) {
  const {updateFilters, putState, getState} = React.useContext(SearchContext);
  const selection = getState(field, []);
  const setSelection = (newSelection) => putState(field, newSelection);
  const chips = buildChips(options, selection, onSelection);

  function onSelection(newSelection) {
    setSelection(newSelection);
    updateFilters(field, operation, newSelection);
  }

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

function buildChips(options, selection, onSelection) {
  const chips = [];
  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    const selected = selection.includes(option.value);

    function onPress() {
      if (selection.includes(option.value)) {
        const newValue = selection.filter((value) => value !== option.value);
        onSelection(newValue);
      } else {
        const newValue = selection.concat(option.value);
        onSelection(newValue);
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
