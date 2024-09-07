import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { InputWithLabel, PickerWithLabel, AppButton } from './UI';
let common = require('./CommonData');
let SQLite = require('react-native-sqlite-storage');

const openCallback = () => {
  console.log('Database opened successfully');
};

const errorCallback = (err: any) => {
  console.log('Error in opening the database: ' + err);
};

const EditScreen = ({ route, navigation }: any) => {
  const [storeID, setStoreID] = useState(route.params.id);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('01');
  const [floor, setFloor] = useState('01');
  const [exfloor, setExfloor] = useState('');
  const [description, setDescription] = useState('');

  let db = SQLite.openDatabase(
    { name: 'db.sqlite', createFromLocation: '~db.sqlite' },
    openCallback,
    errorCallback
  );

  const _query = () => {
    try {
      db.transaction((tx: any) => {
        tx.executeSql(
          'SELECT * FROM stores WHERE id = ?',
          [storeID],
          (tx: any, results: any) => {
            if (results.rows.length) {
              setPhoto(results.rows.item(0).photo);
              setName(results.rows.item(0).name);
              setPhone(results.rows.item(0).phone);
              setCategory(results.rows.item(0).category);
              setFloor(results.rows.item(0).floor);
              setExfloor(results.rows.item(0).exfloor);
              setDescription(results.rows.item(0).description);
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load store data!');
    }
  };

  useEffect(() => {
    _query();
  }, []); // Runs once when the component is mounted

  const _update = () => {
    db.transaction(
      (tx: any) => {
        tx.executeSql(
          'UPDATE stores SET photo=?, name=?, phone=?, category=?, floor=?, exfloor=?, description=? WHERE id=?',
          [photo, name, phone, category, floor, exfloor, description, storeID],
          (tx: any, results: any) => {
            if (results.rowsAffected > 0) {
              Alert.alert('Success', 'Store updated successfully!');
              route.params.refresh(storeID);
              route.params.homeRefresh();
              navigation.goBack();
            } else {
              Alert.alert('Error', 'Failed to update the store!');
            }
          },
          (error: any) => {
            console.error('Error updating store: ', error);
            Alert.alert('Error', 'An error occurred while updating the store.');
          }
        );
      },
      (error: any) => {
        console.error('Transaction error: ', error);
        Alert.alert('Error', 'Transaction failed. Please try again.');
      }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Photo'}
          placeholder={'Place store photo here'}
          value={photo}
          onChangeText={(photo: any) => setPhoto(photo)}
          orientation={'vertical'}
        />

        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Name'}
          placeholder={'Type store Name here'}
          value={name}
          onChangeText={(name: any) => setName(name)}
          orientation={'vertical'}
        />

        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Phone Number'}
          value={phone}
          onChangeText={(phone: any) => setPhone(phone)}
          orientation={'vertical'}
        />

        <PickerWithLabel
          textLabelStyle={styles.TextLabel}
          pickerItemStyle={styles.pickerItemStyle}
          label={'Category'}
          items={common.categorys}
          mode={'dialog'}
          selectedValue={category}
          onValueChange={(itemValue: any, itemIndex: any) => setCategory(itemValue)}
          orientation={'vertical'}
          textStyle={{ fontSize: 24 }}
        />

        <PickerWithLabel
          textLabelStyle={styles.TextLabel}
          pickerItemStyle={styles.pickerItemStyle}
          label={'Floor'}
          items={common.floors}
          mode={'dialog'}
          selectedValue={floor}
          onValueChange={(itemValue: any, itemIndex: any) => setFloor(itemValue)}
          orientation={'vertical'}
          textStyle={{ fontSize: 24 }}
        />

        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Extended Floor'}
          value={exfloor}
          onChangeText={(exfloor: any) => setExfloor(exfloor)}
          orientation={'vertical'}
        />

        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Description'}
          value={description}
          onChangeText={(description: any) => setDescription(description)}
          orientation={'vertical'}
        />

        <AppButton
          style={styles.button}
          title={'Save'}
          theme={'primary'}
          onPress={_update}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },
  TextInput: {
    fontSize: 24,
    color: '#000099',
  },
  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
  button: {
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    padding: 20,
    fontSize: 20,
    color: 'white',
  },
});

export default EditScreen;
