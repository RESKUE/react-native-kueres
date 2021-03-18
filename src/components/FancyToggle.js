import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableRipple, Text, useTheme} from 'react-native-paper';

export const FancyToggleContext = React.createContext();

function FancyToggleRow({style, initialValue, children, onSelectionChanged}) {
  const [selection, setSelection] = React.useState(initialValue);
  const theme = useTheme();
  const borderColor = theme.dark ? lightBorder : darkBorder;

  function updateSelection(newSelection) {
    setSelection(newSelection);
    if (onSelectionChanged) {
      onSelectionChanged(newSelection);
    }
  }

  return (
    <FancyToggleContext.Provider value={{selection, updateSelection}}>
      <View style={[styles.row, {borderColor: borderColor}, style]}>
        {children}
      </View>
    </FancyToggleContext.Provider>
  );
}

export default function FancyToggle({label, value}) {
  const {selection, updateSelection} = React.useContext(FancyToggleContext);
  const checked = selection === value;
  const theme = useTheme();
  const borderColor = theme.dark ? lightBorder : darkBorder;
  var backgroundColor = 'transparent';

  if (checked) {
    backgroundColor = theme.dark ? lightBackground : darkBackground;
  }

  return (
    <TouchableRipple
      style={[styles.button, {borderColor, backgroundColor}]}
      onPress={() => updateSelection(value)}
      borderless={true}>
      <Text style={styles.label}>{label}</Text>
    </TouchableRipple>
  );
}

FancyToggle.Row = FancyToggleRow;

const lightBorder = 'rgba(255,255,255,0.29)';
const darkBorder = 'rgba(0,0,0,0.29)';
const lightBackground = 'rgba(255, 255, 255, .12)';
const darkBackground = 'rgba(0, 0, 0, .08)';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
  },
  button: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
  },
  label: {
    textAlign: 'center',
  },
});
