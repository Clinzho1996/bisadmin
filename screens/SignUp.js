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

const {width, height} = Dimensions.get('window');

const SignUp = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function register() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    let item = {email, password, confirm_password, phone, name};
    console.warn(item);

    fetch('https://hiousapp.com/api/admin/create_user.php', {
      method: 'POST',
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
            navigation.navigate('SignUp');
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
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
                justifyContent: 'flex-start',
                display: 'flex',
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
                  width: 70,
                  height: 70,
                  marginTop: 0,
                  opacity: 0.8,
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>
            <Text style={styles.text}>Employee Registration</Text>
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
                <Icon name="person-outline" size={20} color={'#C4C4C4'} />
                <TextInput
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    fontSize: 16,
                    paddingLeft: 10,
                    color: '#C4C4C4',
                  }}
                  placeholder="Employee's Name"
                  placeholderTextColor={'#C4C4C4'}
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </View>
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
                <Icon name="call-outline" size={20} color={'#C4C4C4'} />
                <TextInput
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    fontSize: 16,
                    paddingLeft: 10,
                    color: '#C4C4C4',
                  }}
                  placeholder="Employee's Phone Number"
                  placeholderTextColor={'#C4C4C4'}
                  value={phone}
                  onChangeText={text => setPhone(text)}
                  keyboardType={'numeric'}
                />
              </View>
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
                <Icon name="mail-outline" size={20} color={'#C4C4C4'} />
                <TextInput
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    fontSize: 16,
                    paddingLeft: 10,
                    color: '#C4C4C4',
                  }}
                  placeholder="Employee's Email address"
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
                    placeholder="Employee Password"
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
                    placeholder="Renter Employee Password"
                    placeholderTextColor={'#C4C4C4'}
                    secureTextEntry={!showPassword}
                    value={confirm_password}
                    onChangeText={text => setConfirmPassword(text)}
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
                  <TouchableOpacity style={styles.btnLogin} onPress={register}>
                    <Text style={styles.btnText}>Create Employee Account</Text>
                  </TouchableOpacity>
                  {/* <Text>{resultData}</Text> */}
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{color: '#828282', fontSize: 16, marginRight: 10}}>
                    Login as Admin ?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 16,
                        color: '#3E90FC',
                      }}>
                      Login
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

export default SignUp;

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
    marginTop: 10,
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