import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import MediaPlayer from './MediaPlayer';
import MediaType from './MediaType';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AUDIOVISUAL_TYPES = [MediaType.video, MediaType.audio];

export default function MediaViewer({uri, type, fgColor, bgColor}) {
  const {colors} = useTheme();

  if (type === MediaType.image) {
    return (
      <Image style={styles.image} source={{uri: uri}} resizeMode="contain" />
    );
  }

  if (AUDIOVISUAL_TYPES.includes(type)) {
    return (
      <MediaPlayer uri={uri} type={type} fgColor={fgColor} bgColor={bgColor} />
    );
  }

  return (
    <View style={styles.center}>
      <Icon name={MediaType.nameIcon(type)} size={96} color={colors.primary} />
      <Text style={styles.text}>Unbekannter Medientyp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
  },
});
