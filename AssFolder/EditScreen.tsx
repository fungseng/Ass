import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Store {
  id: string;
  name: string;
  category: string;
  floor: string;
  localImage: { uri: string };
}

interface EditScreenProps {
  route: {
    params: {
      store?: Store;
      updateStore?: (updatedStore: Store) => void;
    };
  };
}

const EditScreen: React.FC<EditScreenProps> = ({ route }) => {
  const { store, updateStore } = route.params || {};
  const navigation = useNavigation();

  if (!store || !updateStore) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: Store data not provided.</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const [storeName, setStoreName] = useState(store.name);
  const [storeCategory, setStoreCategory] = useState(store.category);
  const [storeFloor, setStoreFloor] = useState(store.floor);
  const [localImage, setLocalImage] = useState(store.localImage.uri);

  const handleUpdate = () => {
    if (storeName && storeCategory && storeFloor) {
      const updatedStore: Store = {
        ...store,
        name: storeName,
        category: storeCategory.toLowerCase(),
        floor: storeFloor,
        localImage: { uri: localImage },
      };
      updateStore(updatedStore); 
      navigation.goBack(); 
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleSelectImage = () => {
    alert("Image picker functionality goes here.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Store</Text>
      <TextInput
        placeholder="Store Name"
        style={styles.input}
        value={storeName}
        onChangeText={setStoreName}
      />
      <TextInput
        placeholder="Category"
        style={styles.input}
        value={storeCategory}
        onChangeText={setStoreCategory}
      />
      <TextInput
        placeholder="Floor"
        style={styles.input}
        value={storeFloor}
        onChangeText={setStoreFloor}
      />
      <View style={styles.imageContainer}>
        <Image source={{ uri: localImage }} style={styles.imagePreview} />
        <TouchableOpacity onPress={handleSelectImage} style={styles.imageButton}>
          <Text style={styles.imageButtonText}>Select Image</Text>
        </TouchableOpacity>
      </View>
      <Button title="Update Store" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  imageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 20,
  },
});

export default EditScreen;
function alert(arg0: string) {
  throw new Error("Function not implemented.");
}

