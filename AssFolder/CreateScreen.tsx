import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import RNFS from 'react-native-fs';
import { Picker } from '@react-native-picker/picker';

const CreateScreen = () => {
  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('');
  const [floor, setFloor] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  // List of categories
  const categories = [
    'Bakery',
    'Beauty and Service',
    'Books, Gifts, and Toys',
    'Department Store',
    'Digital and Home Appliances',
    'Enrichments and Hobbies',
    'Fashion',
    'Food and Beverages',
    'Food Court',
    'Entertainment',
    'Health and Wellness',
    'Lifestyle and Home Living',
    'Convenience and Services',
    'Snacks and Dessert',
    'Sports and Shoes',
  ];

  // Function to check if file exists and create if not
  const checkAndCreateFile = async (filePath) => {
    try {
      const fileExists = await RNFS.exists(filePath);
      if (!fileExists) {
        await RNFS.writeFile(filePath, '', 'utf8'); // Create an empty file
        console.log(`File created at: ${filePath}`);
      }
    } catch (error) {
      console.error(`Failed to create or access file at ${filePath}:`, error);
    }
  };

  // Function to create the new store file
  const createStoreFile = async () => {
    if (!storeName || !category || !floor || !phone || !description) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Store Component Template with Placeholder Image
    const storeComponent = `
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserRole } from '../UserRoleContext'; // Context to get the user role
import { FloatingAction } from 'react-native-floating-action';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ${storeName} = () => {
  const navigation = useNavigation();
  const { userRole } = useUserRole(); 
  
  const handleEdit = () => {
    navigation.navigate('EditScreen', { storeData: { name: '${storeName}', category: '${category}', floor: '${floor}', phone: '${phone}', description: '${description}' } });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Store',
      'Are you sure you want to delete this store?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Store deleted') }, // Replace with your delete logic
      ],
      { cancelable: true }
    );
  };

  const actionsForAdmin = [
    { text: 'Edit', icon: require('../../icons/edit_icon.png'), name: 'edit', position: 1 },
    { text: 'Delete', icon: require('../../icons/delete_icon.jpg'), name: 'delete', position: 2 },
  ];

  const handleActionPress = (name) => {
    if (name === 'edit') handleEdit();
    else if (name === 'delete') handleDelete();
  };

  const Actions = [...(userRole === 'admin' ? actionsForAdmin : [])];

  return (
    <View style={styles.container}>
      <Image source={require('../images/placeholder.png')} style={styles.storeImage} />
      <View style={styles.storeInfo}>
        <Text style={styles.category}>${category}</Text>
        <Text style={styles.storeName}>${storeName}</Text>
        <Text style={styles.floor}>${floor}</Text>
        <Text style={styles.phoneNumber}>${phone}</Text>
        <Text style={styles.description}>${description}</Text>
      </View>
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
  container: { flex: 1, padding: 16 },
  storeImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 16 },
  storeInfo: { marginBottom: 16 },
  category: { fontSize: 16, fontWeight: '600', color: '#555' },
  storeName: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  floor: { fontSize: 16, marginTop: 4, color: '#777' },
  phoneNumber: { fontSize: 16, color: '#777', marginTop: 4 },
  description: { fontSize: 16, marginTop: 16, lineHeight: 24, color: '#333' },
});

export default ${storeName};
`;

    const filePath = `${RNFS.DocumentDirectoryPath}/Assfolder/DetailPages/${storeName}.tsx`;

    try {
      await checkAndCreateFile(filePath); // Ensure file exists before writing
      await RNFS.writeFile(filePath, storeComponent, 'utf8');
      Alert.alert('Success', `Store ${storeName} created successfully!`);
    } catch (err) {
      Alert.alert('Error', `Failed to create store: ${err.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Store Name:</Text>
      <TextInput style={styles.input} value={storeName} onChangeText={setStoreName} placeholder="Enter store name" />

      <Text style={styles.label}>Category:</Text>
      <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
        <Picker.Item label="Select a category" value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

      <Text style={styles.label}>Floor:</Text>
      <TextInput style={styles.input} value={floor} onChangeText={setFloor} placeholder="Enter floor" />

      <Text style={styles.label}>Phone:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Enter phone number" keyboardType="phone-pad" />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
        numberOfLines={4}
      />

      <Button title="Create Store" onPress={createStoreFile} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, marginVertical: 8 },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 5 },
});

export default CreateScreen;
