import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Text} from 'react-native-paper';

export default function InfoIndicator({icon, text}) {
  return (
    <View style={styles.container}>
      {icon && <Avatar.Icon style={styles.icon} size={64} icon={icon} />}
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
  },
});
