import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function SearchBar({children, field, operation, updateFilters}) {
  const {colors} = useTheme();
  const barBorderStyle = {borderColor: colors.primary};

  function onSubmitEditing({nativeEvent}) {
    updateFilters(field, operation, nativeEvent.text);
  }

  return (
    <View style={[styles.bar, barBorderStyle]}>
      <TextInput
        style={styles.search}
        placeholder="Suche"
        onSubmitEditing={onSubmitEditing}
      />
      <View style={styles.buttons}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    elevation: 1,
    borderRadius: 8,
    borderWidth: 0.75,
    backgroundColor: '#ffffff',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    flex: 1,
    paddingHorizontal: 16,
  },
  buttons: {
    flexDirection: 'row',
  },
});
