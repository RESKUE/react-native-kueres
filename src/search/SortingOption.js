import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, IconButton} from 'react-native-paper';
import Sorting from './Sorting';

export default function SortingOption({updateSorters, field, label}) {
  const [sorting, setSorting] = React.useState(Sorting.none);

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
        <IconButton icon={getIconName(sorting)} onPress={onPress} />
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
