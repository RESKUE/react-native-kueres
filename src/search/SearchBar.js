import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function SearchBar({children}) {
  const {colors} = useTheme();
  const barBorderStyle = {borderColor: colors.primary};

  return (
    <View style={[styles.bar, barBorderStyle]}>
      <TextInput style={styles.search} placeholder="Suche" />
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
