import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";


const G21 = () => {
  const [imageSource, setImageSource] = useState(require('./MapImg/G21.png'));

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.button}
          onPress={() => {setImageSource(require('./MapImg/G21.png'));

          }}>
          <Text style={styles.buttonText}>G</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={() => {setImageSource(require('./MapImg/L1.png'));
          }}>
          <Text style={styles.buttonText}>F1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={() => {setImageSource(require('./MapImg/L2.png'));
          }}>
          <Text style={styles.buttonText}>F2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={() => { setImageSource(require('./MapImg/L3.png'));
          }}>
          <Text style={styles.buttonText}>F3</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};
export default G21;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  tabContainer: {
    position: 'absolute',
    top: 140, // Adjust this value to move the tab higher
    left: 10,
    width: 55, // Adjust the width to control the width of the buttons
    // Use flex to arrange buttons vertically
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15, // Increase padding for larger buttons
    marginBottom: 10,
    borderRadius: 10,
    width: '100%', // Make buttons take up the full width of the tabContainer
    alignItems: 'center', // Center text inside button
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Increase font size for better readability
  },
});


