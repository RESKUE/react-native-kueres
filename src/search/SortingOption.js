import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, IconButton} from 'react-native-paper';
import Sorting from './Sorting';
import SearchContext from './SearchContext';

export default function SortingOption({field, label, testID}) {
  const {updateSorters, putState, getState} = React.useContext(SearchContext);
  const setSorting = (newSorting) => putState(field, newSorting);
  const sorting = getState(field, Sorting.none);

  function onPress() {
    const newSorting = Sorting.next(sorting);
    setSorting(newSorting);
    updateSorters(field, newSorting);
  }

  return (
    <View style={styles.option}>
      <Text>{label}</Text>
      <View style={styles.semantic}>
        <Text>{getIconLabel(sorting)}</Text>
        <IconButton
          testID={testID}
          icon={getIconName(sorting)}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  semantic: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function getIconLabel(sorting) {
  if (sorting === Sorting.ascending) {
    return 'Aufsteigend';
  }
  if (sorting === Sorting.descending) {
    return 'Absteigend';
  }
  return 'Unsortiert';
}

function getIconName(sorting) {
  if (sorting === Sorting.ascending) {
    return 'sort-ascending';
  }
  if (sorting === Sorting.descending) {
    return 'sort-descending';
  }
  return 'sort';
}
