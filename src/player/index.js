import React, {useState} from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  STATE_PLAYING,
} from 'react-native-track-player';
import {View, StyleSheet, Button} from 'react-native';
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
];

const Player = () => {
  const [playerState, setPlayerState] = useState(null);

  useTrackPlayerEvents(events, event => {
    if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
      setPlayerState(event.state);
    }
  });

  const isPlaying = playerState === STATE_PLAYING;

  let track = {
    url: 'https://radio2.pro-fhi.net/radio/9111/stream.mp3',
    title: 'Hotel Radio',
    artist: 'Hotel Radio',
    album: 'Hotel Radio',
    genre: 'Hip-Hop, Electro',
    date: '2014-05-20T07:00:00+00:00',
    artwork:
      'https://hotelradioparis.com/wp-content/uploads/2021/03/LogoELE.png',
    duration: 402
  };

  TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_STOP,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_STOP,
    ],
  });

  const start = () => {
    TrackPlayer.add([track]);
    TrackPlayer.play();

  };

  const reset = async () => {
    console.log(isPlaying);
    TrackPlayer.stop();
    TrackPlayer.destroy();
    TrackPlayer.add([track]);
    TrackPlayer.play();
  };

  const pause = () => {
    TrackPlayer.pause();
    console.log(isPlaying);
    console.log(playerState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <FontAwesomeIcon
          icon={faPlay}
          size={40}
          style={styles.Btn}
          onPress={start}
          display={!isPlaying ? 'flex' : 'none'}
        />
        <FontAwesomeIcon
          icon={faPause}
          size={40}
          style={styles.Btn}
          onPress={pause}
          display={isPlaying ? 'flex' : 'none'}
        />
      </View>
      <View style={styles.liveView}>
        <Button
          style={styles.buttonLive}
          title="Live"
          color="#841584"
          onPress={reset}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
  },
  Btn: {
    alignSelf: 'center',
    color: 'white',
    position: 'absolute',
  },
  liveView: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    },
  
  buttonView: {
    margin: 10,
    height: 100,
    width: 100,
    backgroundColor: 'transparent',
    border: '5px solid',
    borderWidth: 3,
    borderRadius: 100,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
});
export default Player;
