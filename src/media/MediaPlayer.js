import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, IconButton, Text} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MediaType from './MediaType';

export default function MediaPlayer({uri, type, bgColor, fgColor}) {
  const {colors} = useTheme();
  const player = React.useRef();
  const [state, setState] = React.useState({
    paused: true,
    time: 0,
    duration: 0,
  });

  function onLoad(data) {
    setState({...state, time: data.currentTime, duration: data.duration});
  }

  function onProgress(data) {
    setState({...state, time: data.currentTime});
  }

  function onEnd() {
    setState({...state, paused: true});
    player.current.seek(0);
  }

  function togglePlayback() {
    setState({...state, paused: !state.paused});
  }

  function skipBackward() {
    player.current.seek(state.time - 5);
    setState({...state, time: state.time - 5});
  }

  function skipForward() {
    player.current.seek(state.time + 5);
    setState({...state, time: state.time + 5});
  }

  function onSeek(time) {
    player.current.seek(time);
    setState({...state, time: time});
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Icon
          style={{color: colors.primary}}
          name={MediaType.nameIcon(type)}
          size={96}
        />
        <Video
          ref={player}
          style={styles.player}
          source={{uri: uri}}
          resizeMode="contain"
          controls={false}
          paused={state.paused}
          onLoad={onLoad}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={[styles.controls, {backgroundColor: bgColor}]}>
        <View style={styles.row}>
          <IconButton
            style={styles.button}
            icon="skip-backward"
            size={32}
            color={fgColor}
            onPress={skipBackward}
          />
          <IconButton
            style={styles.button}
            icon={state.paused ? 'play' : 'pause'}
            size={32}
            color={fgColor}
            onPress={togglePlayback}
          />
          <IconButton
            style={styles.button}
            icon="skip-forward"
            size={32}
            color={fgColor}
            onPress={skipForward}
          />
        </View>
        <View style={styles.row}>
          <Text style={{color: fgColor}}>{Math.floor(state.time)} Sek.</Text>
          <Slider
            style={styles.slider}
            value={state.time}
            minimumValue={0}
            maximumValue={state.duration}
            step={1}
            onValueChange={onSeek}
            thumbTintColor={fgColor}
            maximumTrackTintColor={fgColor}
            minimumTrackTintColor={fgColor}
          />
          <Text style={{color: fgColor}}>
            {Math.floor(state.duration)} Sek.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  controls: {
    width: '100%',
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 8,
  },
  slider: {
    flex: 1,
  },
});
