import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView } from "react-native";

const G43 = () => {
  const [imageSource, setImageSource] = useState(require('./MapImg/G43.png'));

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
      >
        <Image source={imageSource} style={styles.image} />
      </ScrollView>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setImageSource(require('./MapImg/G43.png'))}
        >
          <Text style={styles.buttonText}>G</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setImageSource(require('./MapImg/L1.png'))}
        >
          <Text style={styles.buttonText}>F1</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setImageSource(require('./MapImg/L2.png'))}
        >
          <Text style={styles.buttonText}>F2</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setImageSource(require('./MapImg/L3.png'))}
        >
          <Text style={styles.buttonText}>F3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    width: '200%', // Adjust to fit the content or use flex if needed
    paddingLeft: 70,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  tabContainer: {
    position: 'absolute',
    top: 140,
    left: 10,
    width: 55,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default G43;
