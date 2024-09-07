import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { stores } from '../CommonData'; // Import the stores object
import { useUserRole } from '../UserRoleContext'; // Context to get the user role
import { FloatingAction } from 'react-native-floating-action';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import G42 from '../MapPages/G42';
const ADIDAS = () => {
  const navigation = useNavigation();
  const storeData = stores.sports.find(store => store.id === 1);
  const { userRole } = useUserRole(); 
  // Edit function
  const handleEdit = () => {
    // Navigate to an Edit Screen with storeData as a parameter
    navigation.navigate('EditScreen', { storeData });
  };

  // Delete function
  const handleDelete = () => {
    // Confirmation alert
    Alert.alert(
      'Delete Store',
      'Are you sure you want to delete this store?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Logic to delete the store
            console.log('Store deleted'); // Replace with your delete logic
          },
        },
      ],
      { cancelable: true }
    );
  };

  const actionsForAdmin = [
    {
      text: 'Edit',
      icon: require('../../icons/edit_icon.png'), // Provide the correct path to the icon
      name: 'edit',
      position: 1,
    },
    {
      text: 'Delete',
      icon: require('../../icons/delete_icon.jpg'), // Provide the correct path to the icon
      name: 'delete',
      position: 2,
    },
  ];

  const handleActionPress = (name) => {
    if (name === 'edit') handleEdit();
    else if (name === 'delete') handleDelete();
  };

  const Actions = [...(userRole === 'admin' ? actionsForAdmin : [])];


  return (
    <View style={styles.container}>
     <Image source={storeData?.localImage ? storeData.localImage : undefined}
  style={styles.storeImage}
/>
      <View style={styles.storeInfo}>
        <View style={styles.storeDetails}>
          <Text style={styles.category}>Sports and Shoes</Text>
          <Text style={styles.storeName}>{storeData?.name}</Text>
          <Text style={styles.floor}>{storeData?.floor}</Text>
          <Text style={styles.phoneNumber}>{storeData?.phone}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.navigate(G42)} // Update with correct route name
        >
          <Text style={styles.mapButtonText}>Map</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{storeData?.description}</Text>
        {/* Floating Action Buttons (Visible only for admins) */}
        {userRole === 'admin' && (
        <FloatingAction
          actions={Actions}
          onPressItem={handleActionPress}
          floatingIcon={<MaterialCommunityIcons name="plus" size={24} color="#fff" />}
        />
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, bottom: 50, },
  storeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  storeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  storeDetails: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  floor: {
    fontSize: 16,
    marginTop: 4,
    color: '#777',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    marginTop: 16,
    lineHeight: 24,
    color: '#333',
  },
  mapButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center', // Center the text
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ADIDAS;
