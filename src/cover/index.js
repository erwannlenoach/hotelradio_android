import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';

const Cover = () => {
  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    myFetch();
  }, []);

  async function myFetch() {
    const cheerio = require('react-native-cheerio');

    let response = await fetch('https://hotelradioparis.com/');
    let text = await response.text();
    const $ = cheerio.load(text);
    let images = $.html('[class="proradio-slider__i wp-post-image"]');
    let src = $(images).attr('src');
    let titleHTML = $.html(
      '[class="proradio-customplayer__showtitle proradio-cutme-t"]',
    );
    let title = $(titleHTML).text().trim();
    let timeHTML = $.html(
      '[class="proradio-customplayer__time proradio-itemmetas"]',
    );

    let time = $(timeHTML).text().trim().replace('access_time', '');
    setUrl(src);
    setTitle(title);
    setTime(time);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{
          uri: url,
        }}
        opacity={0.7}
        resizeMode="contain"
      />
       </View>
      <SafeAreaView style={styles.textView}>
        <Text style={styles.text}>NOW ON AIR</Text>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textTime}>{time}</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth:3,
    borderStyle: 'solid',
  
  },

  textView: {
    flex: 1,
    flexDirection: 'column',
    right: 0,
    position: 'absolute',
    bottom: 10,
    left: 0,
    textAlign: 'left',
    marginLeft: 10,
  },
  text: {
    color: 'white',
    fontSize: 10,
  },
  textTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  textTime: {
    color: 'white',
    fontSize: 10,
  },
imageContainer: {
  width: 250,
  height:250
},
  image: {
    flex: 1,
    justifyContent: 'center',
    margin: 0,
  },
});

export default Cover;
