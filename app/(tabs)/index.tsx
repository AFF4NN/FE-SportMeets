import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
      <ThemedView  style={styles.pageContainer} >

        <ThemedText  style={styles.titleText} type="title">SportMeets</ThemedText>

        
      </ThemedView>
  );
}

const styles = StyleSheet.create({

  titleText: {
    color: '#90000',
    bottom: '100%', // Centers the text vertically
    left: '5%',  // Centers the text horizontally
    transform: [{ translateX: 110 }, { translateY:100 }], // Adjusts the position to be exactly in the center
    position: 'absolute'
  },

  pageContainer: {
    width: "100%",
    height: "100%",
  },
});
