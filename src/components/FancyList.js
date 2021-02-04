import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme, List, Divider, Surface} from 'react-native-paper';

export default function FancyList({title, data = [], component}) {
  const {colors} = useTheme();
  const Component = component;
  const items = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    items.push(<Component key={`item-${index}`} data={element} />);
    if (index < data.length - 1) {
      items.push(<Divider key={`divider-${index}`} />);
    }
  }

  return (
    <Surface style={[styles.surface, {borderColor: colors.primary}]}>
      <View style={styles.titleGap}>
        <Text style={[styles.title, {color: colors.primary}]}>{title}</Text>
      </View>
      <List.Section>{items}</List.Section>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    elevation: 1,
    borderRadius: 8,
    borderWidth: 0.75,
    borderColor: '#01A569',
    position: 'relative',
  },
  titleGap: {
    position: 'absolute',
    height: 1,
    left: 16,
    top: -1,
    backgroundColor: '#ffffff',
  },
  title: {
    marginTop: -10,
    fontWeight: 'bold',
    color: '#01A569',
  },
});
