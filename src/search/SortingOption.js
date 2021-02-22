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
      <IconButton icon={getIconName(sorting)} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

function getIconName(sorting) {
  if (sorting === Sorting.ascending) {
    return 'sort-ascending';
  }
  if (sorting === Sorting.descending) {
    return 'sort-descending';
  }
  return 'sort';
}
