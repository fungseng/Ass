import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App'; // Adjust the path as needed
import { useUserRole } from './UserRoleContext'; // Import the useUserRole hook


type AdminLoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AdminLoginScreen'
>;

type Props = {
  navigation: AdminLoginScreenNavigationProp;
};

const AdminLoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track login status
  const { setUserRole } = useUserRole(); // Use userRole context

  const handleLogin = () => {
    if (username === '1' && password === '1') {
      setError(null);
      setIsLoggedIn(true); // Set login status to true
      setUserRole('admin'); // Set role in context
      navigation.navigate('DirectoryScreen'); // Navigate to directory screen
    } else {
      setError('Incorrect username or password');
      Alert.alert('Error', 'Incorrect username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set login status to false
    setUsername('');
    setPassword('');
    setUserRole('guest'); // Reset role in context
    navigation.navigate('HomeScreen'); // Navigate to home screen or login screen
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <>
          <Text style={styles.title}>Admin Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Button title="Login" onPress={handleLogin} />
        </>
      ) : (
        <>
          <Text style={styles.title}>Admin Credentials</Text>
          <Text style={styles.info}>Username: Admin01</Text>
          <Text style={styles.info}>Password: nigawat</Text>
          <Button title="Log Out" onPress={handleLogout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default AdminLoginScreen;
