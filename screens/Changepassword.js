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
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_reset} from '../api/FetchUsersReset';

const {width, height} = Dimensions.get('window');

const Changepassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function changePassword() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);

    const jwt = await AsyncStorage.getItem('AccessToken');
    let item = {password, confirm_password, jwt};
    console.warn(item);

    fetch('https://hiousapp.com/api/admin/reset.php', {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(result => {
        let statusCode = result.status,
          success = result.ok;
        result.json().then(result => {
          if (!success) {
            console.log(result.message);
            Alert.alert('Warning', result.message);
            return;
          } else {
            console.log(result);
            Alert.alert('Success', result.message);
            navigation.navigate('Login');
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <ImageBackground
      source={require('../assets/launch_screen.png')}
      style={styles.container}
      imageStyle={{opacity: 1}}>
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
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 28,
                color: '#7A86C0',
                fontWeight: '600',
                textAlign: 'center',
              }}>
              New Password
            </Text>
            <Text
              style={{
                paddingTop: 20,
                fontSize: 16,
                lineHeight: 24,
                color: '#828282',
                textAlign: 'center',
              }}>
              Your new password must be different {'\n'} from the old one
            </Text>
            <View>
              <View
                style={{
                  backgroundColor: '#f7f7f7',
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  paddingBottom: 10,
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingLeft: 20,
                  marginTop: 30,
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
                  placeholder="Enter new password"
                  placeholderTextColor={'#C4C4C4'}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#f7f7f7',
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
                <Icon name="mail-outline" size={20} color={'#C4C4C4'} />
                <TextInput
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    fontSize: 16,
                    paddingLeft: 10,
                    color: '#C4C4C4',
                  }}
                  placeholder="Confirm new password"
                  placeholderTextColor={'#C4C4C4'}
                  secureTextEntry={true}
                  value={confirm_password}
                  onChangeText={text => setConfirmPassword(text)}
                />
              </View>
              <View>
                <View>
                  <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={changePassword}>
                    <Text style={styles.btnText}>Update Password</Text>
                  </TouchableOpacity>
                  {/* <Text>{resultData}</Text> */}
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default Changepassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: height,
    resizeMode: 'cover',
    paddingHorizontal: 30,
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
    alignItems: 'center',
  },
  containerTwo: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 0,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
