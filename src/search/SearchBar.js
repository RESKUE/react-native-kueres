import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';
import SearchContext from './SearchContext';

export default function SearchBar({children, field, operation, testID}) {
  const [text, setText] = React.useState();
  const {updateFilters} = React.useContext(SearchContext);
  const {colors} = useTheme();
  const barBorderStyle = {borderColor: colors.primary};

  function onSubmitEditing() {
    updateFilters(field, operation, text);
  }

  return (
    <View style={[styles.bar, barBorderStyle]}>
      <TextInput
        style={styles.search}
        placeholder="Suche"
        onSubmitEditing={onSubmitEditing}
        value={text}
        onChangeText={setText}
        testID={testID}
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
