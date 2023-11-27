import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passWord, setPassWord] = useState('');
  const [useName, setUseName] = useState('');

  const handleSignUp = async () => {
    try {
      // Make a POST request to create a new user
      const response = await axios.post('https://653f25b39e8bd3be29e0007b.mockapi.io/user', {
        user_name: useName,
        password: passWord,
        
      });

      // Handle the response from the server
      if (response.status === 201) {
        // Registration successful
        Alert.alert('Success', 'User registered successfully');

        navigation.navigate('Login');
      } else {
        // Registration failed
        Alert.alert('Error', 'Failed to register user');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle other registration errors, e.g., show an error message
      Alert.alert('Error', 'Failed to register user');
    }
  };

  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={require('..//assets/gradient1.jpg')} zIndex={0}>
      <SafeAreaView style={styles.container}>
        <View style={{ width: '100%', height: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ width: '300px', height: '300px' }} source={require('..//assets/ALTP_LOGO_2021.png')} />
          <Text style={{ fontSize: 40, color: 'white', textAlign: 'center' }}> Sign Up</Text>
        </View>
        <View style={{ width: '80%', height: '25%', alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
            value={useName}
            onChangeText={(text) => setUseName(text)}
            style={styles.TextInput_1}
            placeholder='Nhập tên người chơi' />
          <View style={styles.TextInput_2}>
            <TextInput
              value={passWord}
              onChangeText={(text) => setPassWord(text)}
              style={{ width: '70%', height: '100%', fontSize: 17 }}
              autoCapitalize='none'
              secureTextEntry={showPassword ? false : true}
              placeholder='PassWord' />
            <TouchableOpacity
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              <Image style={{ width: '25px', height: '25px' }} source={require('..//assets/anps.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '85%', height: '25%', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput_1: {
    fontSize: 17,
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    marginLeft: 5,
    width: '100%',
    height: '30%',
  },
  TextInput_2: {
    fontSize: 17,
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    marginTop: 5,
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '60%',
    height: '35%',
    backgroundColor: '#0006CB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
