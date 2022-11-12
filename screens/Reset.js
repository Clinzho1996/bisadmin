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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_reset} from '../api/FetchUsersReset';

const {width, height} = Dimensions.get('window');

const Reset = ({navigation}) => {
  const [ref_code, setRefCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function resetCode() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    let item = {ref_code};
    console.warn(item);

    if (resetCode) {
      user_reset({
        ref_code: ref_code,
      })
        .then(result => {
          if (result.status == 200) {
            AsyncStorage.setItem('AccessToken', result.data.jwt);
            console.log(result);
            navigation.navigate('Changepass');
          } else {
            console.log(result.message);
            Alert.alert('Warning', result.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView>
        <ImageBackground
          source={require('../assets/bg.jpg')}
          imageStyle={{opacity: 0.4}}
          style={styles.container}>
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
                    marginTop: 150,
                    marginBottom: 20,
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
                <Text
                  style={{
                    fontSize: 28,
                    color: '#7A86C0',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  Reset Code
                </Text>
                <Text
                  style={{
                    paddingTop: 20,
                    fontSize: 16,
                    lineHeight: 24,
                    color: '#828282',
                    textAlign: 'center',
                  }}>
                  Kindly enter the reset code sent to {'\n'} your email.
                </Text>
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
                      placeholder="Enter Reset Code"
                      placeholderTextColor={'#C4C4C4'}
                      value={ref_code}
                      onChangeText={text => setRefCode(text)}
                    />
                  </View>

                  <View>
                    <View>
                      <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={resetCode}>
                        <Text style={styles.btnText}>Reset your Password</Text>
                      </TouchableOpacity>
                      {/* <Text>{resultData}</Text> */}
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Reset;

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
