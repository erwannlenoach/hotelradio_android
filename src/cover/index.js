import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet}  from 'react-native';

const Cover = () => {
 
  const [url, setUrl] = useState(
    'https://hotelradioparis.com/wp-content/uploads/2021/03/LogoELE.png');

  useEffect(() => {
    myFetch();
    console.log(url)
  }, [])

  async function myFetch() {
    const cheerio = require('react-native-cheerio');

    let response = await fetch('https://hotelradioparis.com/');
    let text = await response.text();
    const $ = cheerio.load(text);
    let images = $.html('[class="proradio-slider__i wp-post-image"]');
    let src = $(images).attr('src');
   setUrl(src);
  }

  return (
    <View style={styles.container}>
   <Image style={styles.image}
        source={{
          uri: url,
        }}
        opacity={0.9}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    padding: 20,
  },
  image: {
    width: 300,
    flex: 3,
    justifyContent: 'center',
    margin:0,

  },
});
  


export default Cover;