import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const POSTS = [
  {
    title: 'cool city',
    location: null,
    image: 'https://store-guides2.djicdn.com/guides/wp-content/uploads/2017/09/spark-feature-image.jpg',
    id: 'xyz123',
    ownerId: 'qwerty12345'
  },
  {
    title: 'sick pano',
    location: null,
    image: 'https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2009/05/windowslivewritercreatingpanoramaswithanycamera-e699pano1-3.jpg?w=600&h=1260&ssl=1',
    id: 'xyz112',
    ownerId: 'qwerty12345'
  },
  {
    title: 'pano award winner',
    location: null,
    image: 'https://s3.amazonaws.com/panoawards/wp-content/uploads/2016/10/Pano_Jesus-M-Garcia.jpg',
    id: 'xyz134',
    ownerId: 'qwerty12345'
  }
]

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Images below</Text>
      {POSTS.forEach(post =>
        <Image
          source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
          style={{width: 400, height: 400}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
