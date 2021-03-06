import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme, List, Divider, Surface, Caption} from 'react-native-paper';

export default function FancyList({
  title,
  placeholder,
  data = [],
  component,
  extraData,
}) {
  const {colors} = useTheme();
  const Component = component;
  const items = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    items.push(
      <Component key={`item-${index}`} data={element} extraData={extraData} />,
    );
    if (index < data.length - 1) {
      items.push(<Divider key={`divider-${index}`} />);
    }
  }

  return (
    <Surface style={[styles.surface, {borderColor: colors.primary}]}>
      <View style={styles.titleGap}>
        <Text style={[styles.title, {color: colors.primary}]}>{title}</Text>
      </View>
      {items.length > 0 ? (
        <List.Section>{items}</List.Section>
      ) : (
        <View style={styles.placeholder}>
          <Caption>{placeholder}</Caption>
        </View>
      )}
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
  placeholder: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
