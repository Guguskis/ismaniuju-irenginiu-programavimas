import * as React from 'react';
import { StyleSheet, Image, Touchable } from 'react-native';

import { Text, View } from '../../components/Themed';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function TabOneScreen() {

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://picsum.photos/200/300",
          width: 300,
          height: 200
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
