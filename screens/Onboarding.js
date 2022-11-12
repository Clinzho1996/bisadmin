/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const Onboarding = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 1000);
  });

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('AccessToken');
    if (!dataToken) {
      navigation.replace('Login');
    } else {
      navigation.replace('Home');
    }
  };
  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      style={styles.container}
      imageStyle={{opacity: 0.4}}>
      <Text style={styles.text}>BIS Employee Tracker App</Text>
      <View>
        <Image source={require('../assets/route.png')} style={styles.img} />
      </View>
      <View>
        <TouchableOpacity style={styles.btnLogin}>
          <Text
            style={styles.btnText}
            onPress={() => navigation.navigate('Login')}>
            Login as Admin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text
            style={styles.btnTextRegister}
            onPress={() => navigation.navigate('SignUp')}>
            Register Employee
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: height,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 50,
    color: '#3E90FC',
  },
  btnLogin: {
    backgroundColor: '#3E90FC',
    width: 300,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  btnRegister: {
    width: 300,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#3E90FC',
  },
  btnTextRegister: {
    color: '#3E90FC',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  img: {
    paddingHorizontal: 30,
    width: 300,
    height: 300,
    marginVertical: 50,
  },
});
