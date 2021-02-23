import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ErrorIndicator({
  label = 'Ein Fehler ist aufgetreten!',
}) {
  const {colors} = useTheme();

  return (
    <View style={styles.center}>
      <Icon name="alert-circle-outline" color={colors.primary} size={64} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
  },
});
