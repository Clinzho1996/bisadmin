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
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_login} from '../api/user_api';

const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    let item = {email, password};
    console.warn(item);

    const checkPasswordValidity = value => {
      const isNonWhiteSpace = /^\S*$/;
      if (!isNonWhiteSpace.test(value)) {
        return 'Password must not contain Whitespaces.';
      }
      const isValidLength = /^.{4,16}$/;
      if (!isValidLength.test(value)) {
        return 'Password must be 8-16 Characters Long.';
      }

      // const isContainsSymbol =
      //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
      // if (!isContainsSymbol.test(value)) {
      //   return 'Password must contain at least one Special Symbol.';
      // }

      return null;
    };

    const checkPassowrd = checkPasswordValidity(password);
    if (!checkPassowrd) {
      user_login({
        email: email.toLocaleLowerCase(),
        password: password,
      })
        .then(result => {
          if (result.status == 200) {
            AsyncStorage.setItem('AccessToken', result.data.jwt);
            console.log(result);
            navigation.replace('Home');
          } else {
            console.log(result.data);
            Alert.alert("Warning", result.data.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      style={styles.container}
      imageStyle={{opacity: 0.4}}>
      <View style={styles.containerTwo}>
        {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Loading...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <>
            <View
              style={{
                paddingHorizontal: 0,
                paddingVertical: 20,
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color={'#3E90FC'} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/logo.png')}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 30,
                  opacity: 0.8,
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>

            <Text style={styles.text}>Login as an Admin</Text>
            <View>
              <View
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  paddingBottom: 10,
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingLeft: 20,
                  marginTop: 40,
                }}>
                <Icon name="mail-outline" size={20} color={'#C4C4C4'} />
                <TextInput
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    fontSize: 16,
                    paddingLeft: 10,
                    color: '#C4C4C4',
                  }}
                  placeholder="Admin Email"
                  placeholderTextColor={'#C4C4C4'}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    paddingBottom: 10,
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingLeft: 20,
                    marginTop: 20,
                  }}>
                  <Icon
                    name="lock-closed-outline"
                    size={20}
                    color={'#C4C4C4'}
                  />
                  <TextInput
                    style={{
                      fontSize: 16,
                      width: '82%',
                      paddingTop: 5,
                      paddingBottom: 5,
                      color: '#C4C4C4',
                    }}
                    placeholder="Admin Password"
                    placeholderTextColor={'#C4C4C4'}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={text => setPassword(text)}
                  />
                  <TouchableOpacity
                    style={{
                      height: 30,
                      width: 30,
                    }}
                    onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={'#C4C4C4'}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={{
                      marginTop: 20,
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}
                    onPress={() => navigation.navigate('Forgot')}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#C4C4C4',
                      }}>
                      Forgot Password ?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={styles.btnLogin} onPress={login}>
                    <Text style={styles.btnText}>Login as Admin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnRegisterAdmin}
                    onPress={() => navigation.navigate('RegisterAdmin')}>
                    <Text style={styles.btnText}>Register as Admin</Text>
                  </TouchableOpacity>
                  {/* <Text>{resultData}</Text> */}
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{color: '#828282', fontSize: 16, marginRight: 10}}>
                    Want to register an employee ?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 16,
                        color: '#3E90FC',
                      }}>
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </ImageBackground>
  );
};
export default Login;

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
    textAlign: 'center',
  },
  btnLogin: {
    backgroundColor: '#3E90FC',
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  btnRegisterAdmin: {
    backgroundColor: 'red',
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
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
  containerTwo: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 0,
    padding: 8,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
