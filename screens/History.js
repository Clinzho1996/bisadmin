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
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Modal, Portal} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

const History = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [visibleTwo, setVisibleTwo] = React.useState(false);
  const showModal = () => setVisibleTwo(true);
  const hideModal = () => setVisibleTwo(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 15,
  };

  async function changePassword() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);

    const id = await AsyncStorage.getItem('StaffId');
    let item = {id};
    console.warn(item);

    fetch('https://hiousapp.com/api/admin/fetch_user_history.php', {
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
            Alert.alert('Result', JSON.stringify(result));
            return setLoading(false);
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
            BIS ADMIN
          </Text>
          <Text
            style={{
              paddingTop: 20,
              fontSize: 16,
              lineHeight: 24,
              color: '#828282',
              textAlign: 'center',
            }}>
            Fetch employee history here
          </Text>
          <View>
            <View>
              <View>
                <TouchableOpacity
                  style={styles.btnLogin}
                  onPress={changePassword}>
                  <Text style={styles.btnText}>Get Employee History</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      </View>
      <Portal>
        <Modal
          visible={visibleTwo}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 20,
            }}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={'blue'}
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              />
            ) : (
              <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <View
                    style={{
                      backgroundColor: '#e8e8e8',
                      padding: 10,
                      borderRadius: 10,
                      margin: 10,
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 16,
                          padding: 5,
                          color: '#000',
                        }}>
                        Employee ID: {item.id}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 16,
                          padding: 5,
                          color: '#000',
                        }}>
                        Login Time: {item.time}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 16,
                          padding: 5,
                          color: '#000',
                        }}>
                        LOcation: {item.location}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            )}
          </ScrollView>
        </Modal>
      </Portal>
    </ImageBackground>
  );
};

export default History;

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
