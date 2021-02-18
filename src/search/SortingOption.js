import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, IconButton} from 'react-native-paper';
import Sorting from './Sorting';

export default function SortingOption({label, sorting, setSorting}) {
  function onPress() {
    setSorting(Sorting.next(sorting));
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
