import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';

export default function LoadingIndicator({label = 'Lädt...'}) {
  return (
    <View style={styles.center}>
      <ActivityIndicator animated={true} size={36} />
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
