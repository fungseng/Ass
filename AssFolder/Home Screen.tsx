import React from "react";
import { Button, Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import EventDetails from './EventDetails';
import PromotionDetails from "./PromotionDetails";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Home Screen</Text>
        <Image style={styles.image} source={require('./Images/img1.png')} />
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('EventDetails')}>
            <Image style={styles.buttonImage} source={require('./EventNPromoImages/EventImg.png')} />
            <Text style={styles.buttonText}>EventDetails</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('PromotionDetails')}>
            <Image style={styles.buttonImage} source={require('./EventNPromoImages/EventImg.png')} />
            <Text>Promotions</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.copyright}>Copyright © 2024 Shopping Mall Guide Sdn Bhd</Text>
        <Text style={styles.copyright}>All rights reserved. This guide and all content herein are the property of City Center Mall and may not be reproduced, distributed, or transmitted in any form without prior written permission.</Text>
        
      </View>
    </SafeAreaView>
  )
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="PromotionDetails" component={PromotionDetails}/>
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1 },
  header: { textAlign: 'center', fontSize: 30, backgroundColor: 'red', padding: 16 },
  image: { height: 250, width: 373, margin: 10 },
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%' },
  buttonContainer: { alignItems: 'center', marginHorizontal: 10 },
  buttonImage: { width: 176, height: 150, marginBottom: 5, marginTop: 10 },
  buttonText: { fontSize: 16 },
  copyright: { fontSize: 12, textAlign: 'center', alignItems: 'center', backgroundColor: 'gray', marginTop: 20 }
});
