const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json()); // For parsing application/json
app.use(cors()); // Enable CORS

const directoryDbFilePath = path.join(__dirname, '../assets/directory.sqlite'); // Path to directory.sqlite

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Initialize SQLite Database
const initDatabase = (dbPath) => {
  ensureDirectoryExists(path.dirname(dbPath));
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database', err);
    } else {
      console.log(`Database opened successfully at ${dbPath}`);
    }
  });

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS stores (
      id TEXT PRIMARY KEY,
      name TEXT,
      category TEXT,
      description TEXT,
      phone TEXT,
      floor TEXT,
      mapLocation TEXT
    )`);
  });

  return db;
};

// Handle store creation
app.post('/create-store', (req, res) => {
  const { storeName, storeData } = req.body;

  if (!storeData || !storeData.mapLocation) {
    console.error('Invalid store data:', req.body);
    return res.status(400).json({ error: 'Invalid store data' });
  }

  const sanitizedStoreName = storeName.replace(/\s+/g, '_');
  const directoryPath = path.join(__dirname, '../AssFolder/DetailsPages');
  ensureDirectoryExists(directoryPath);
  const filePath = path.join(directoryPath, `${sanitizedStoreName}.tsx`);

  // Write the .tsx component to the file
  const storeComponent = `
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { stores } from '../CommonData'; // Import the stores object
import { useUserRole } from '../UserRoleContext'; // Context to get the user role
import { FloatingAction } from 'react-native-floating-action';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ${storeData.mapLocation} from '../MapPages/${storeData.mapLocation}';

const ${sanitizedStoreName} = () => {
  const navigation = useNavigation();
  const storeData = stores.${storeData.category.toLowerCase().replace(/ /g, '_')}.find(store => store.id === '${storeData.id}');
  const { userRole } = useUserRole(); 

  const handleEdit = () => {
    navigation.navigate('EditScreen', { storeData });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Store',
      'Are you sure you want to delete this store?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => { console.log('Store deleted'); } },
      ],
      { cancelable: true }
    );
  };

  const actionsForAdmin = [
    {
      text: 'Edit',
      icon: require('../../icons/edit_icon.png'),
      name: 'edit',
      position: 1,
    },
    {
      text: 'Delete',
      icon: require('../../icons/delete_icon.jpg'),
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
      <Image source={require('../DetailsPages/PagesImg/placeholder.png')} style={styles.storeImage} />
      <View style={styles.storeInfo}>
        <View style={styles.storeDetails}>
          <Text style={styles.category}>{storeData.category}</Text>
          <Text style={styles.storeName}>{storeData?.name}</Text>
          <Text style={styles.floor}>{storeData?.floor}</Text>
          <Text style={styles.phoneNumber}>{storeData?.phone}</Text>
        </View>
        <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate(${storeData.mapLocation})}>
          <Text style={styles.mapButtonText}>Map</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{storeData?.description}</Text>
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
  container: { flex: 1, padding: 16, bottom: 50 },
  storeImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 16 },
  storeInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  storeDetails: { flex: 1 },
  category: { fontSize: 16, fontWeight: '600', color: '#555' },
  storeName: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  floor: { fontSize: 16, marginTop: 4, color: '#777' },
  phoneNumber: { fontSize: 16, color: '#777', marginTop: 4 },
  description: { fontSize: 16, marginTop: 16, lineHeight: 24, color: '#333' },
  mapButton: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center' },
  mapButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ${sanitizedStoreName};
`;

  try {
    fs.writeFileSync(filePath, storeComponent);
    console.log(`Store ${sanitizedStoreName} saved to ${filePath}`);

    // Insert store data into SQLite database
    const directoryDb = initDatabase(directoryDbFilePath);

    const insertStoreData = (database) => {
      const stmt = database.prepare('INSERT INTO stores (id, name, category, description, phone, floor, mapLocation) VALUES (?, ?, ?, ?, ?, ?, ?)');
      stmt.run(storeData.id, storeName, storeData.category, storeData.description, storeData.phone, storeData.floor, storeData.mapLocation);
      stmt.finalize();
    };

    // Insert into directory.sqlite database
    insertStoreData(directoryDb);

    // Close the database connection
    directoryDb.close((err) => {
      if (err) console.error('Error closing directory database', err);
    });

    res.json({ message: 'Store created successfully' });
  } catch (err) {
    console.error('Failed to write file:', err);
    res.status(500).json({ error: 'Failed to write file' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
