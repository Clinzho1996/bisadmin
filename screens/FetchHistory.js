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
  SafeAreaView,
  Pressable,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Portal} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_history} from '../api/user_history';

const {width, height} = Dimensions.get('window');

const FetchHistory = ({navigation}) => {
  const [id, setId] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [loading, setLoadingTwo] = useState(false);
  const [data, setData] = useState([]);
  const [dataTwo, setDataTwo] = useState([]);
  const [visibleFour, setVisibleFour] = React.useState(false);
  const showModalFour = () => setVisibleFour(true);
  const hideModalFour = () => setVisibleFour(false);

  const showModal = () => {
    setModalVisibleEleven(true);
  };

  const [modalVisibleEleven, setModalVisibleEleven] = useState(false);

  async function fetchHistory() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    let item = {id};

    if (fetchHistory) {
      user_history({
        id: id,
      })
        .then(result => {
          if (result.status == 200) {
            AsyncStorage.setItem(
              'StaffId',
              result.config.data[7] + result.config.data[8],
            );
            console.log(result.config.data[7] + result.config.data[8]);
            // Alert.alert('Result', JSON.stringify(result.data));
            console.log(JSON.stringify(result.data));
            setData(result.data);
          } else {
            console.log(result.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  async function getCount() {
    setLoadingTwo(true);
    setTimeout(() => {
      setLoadingTwo(false);
    }, 4000);
    let item = {id, location};
    console.warn(item);

    fetch('https://hiousapp.com/api/admin/get_location_count.php', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(result => {
      let statusCode = result.status,
        success = result.ok;
      result.json().then(result => {
        if (!success) {
          console.log(result.message);
          Alert.alert('Warning', result.message);
          return;
        } else {
          showModal();
          console.log(result);
          alert(JSON.stringify(result));
        }
      });
    });
  }

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 15,
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleEleven}
        onRequestClose={() => {
          setModalVisibleEleven(!modalVisibleEleven);
        }}>
        <ScrollView
          style={styles.centeredView}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalView}>
            <Pressable
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                position: 'absolute',
                right: 20,
                top: 20,
              }}
              onPress={() => setModalVisibleEleven(!modalVisibleEleven)}>
              <Icon name="close" size={30} color={'#fff'} />
            </Pressable>
            <Text style={styles.modalText}>Location Count</Text>
            {loading ? (
              <Text
                style={{
                  fontSize: 16,
                  paddingLeft: 10,
                  fontWeight: '400',
                  color: '#5C5C5C',
                }}>
                Loading
              </Text>
            ) : (
              <Text style={{color: '#fefefe', fontSize: 16}}>
                {location} : {id} times
              </Text>
            )}
            <View style={styles.close}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleEleven(!modalVisibleEleven);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: '500',
                    marginLeft: 20,
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <View>
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
          {/* <Text style={styles.text}>Fetch User History</Text> */}
          <View>
            <View
              style={{
                marginTop: 0,
              }}>
              <TextInput
                placeholder="Enter employee ID here ..."
                placeholderTextColor={'#3E90FC'}
                style={{
                  color: '#3E90FC',
                  backgroundColor: 'none',
                  borderBottomColor: '#3E90FC',
                  borderBottomWidth: 1,
                  fontSize: 18,
                }}
                value={id}
                onChangeText={text => setId(text)}
              />
            </View>
            <View>
              <View>
                <TouchableOpacity
                  style={styles.btnLogin}
                  onPress={fetchHistory}>
                  <Text style={styles.btnText}>Fetch User History</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                paddingVertical: 20,
                height: height,
              }}>
              {isLoading ? (
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
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        backgroundColor: '#e8e8e8',
                        padding: 10,
                        borderRadius: 10,
                        margin: 10,
                      }}
                      key={index}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon name="person" size={34} color={'#3E90FC'} />
                        <Text
                          style={{
                            color: '#3E90FC',
                            fontSize: 18,
                            fontWeight: '600',
                            textTransform: 'capitalize',
                          }}>
                          {item.id}
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
                          Location: {item.location}
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
                          Time: {item.time}
                        </Text>
                      </View>
                      <View key={index}>
                        <TextInput
                          placeholder="Enter employee ID here ..."
                          placeholderTextColor={'#3E90FC'}
                          style={{
                            color: '#3E90FC',
                            backgroundColor: 'none',
                            borderBottomColor: '#3E90FC',
                            borderBottomWidth: 1,
                            fontSize: 18,
                          }}
                          value={id}
                          onChangeText={text => setId(text)}
                        />
                        <TextInput
                          placeholder="Enter employee ID here ..."
                          placeholderTextColor={'#3E90FC'}
                          style={{
                            color: '#3E90FC',
                            backgroundColor: 'none',
                            borderBottomColor: '#3E90FC',
                            borderBottomWidth: 1,
                            fontSize: 18,
                          }}
                          // value={location}
                          defaultValue={location}
                          onChangeText={text => setLocation(text)}
                          keyExtractor={item => item.index}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.btnRegister}
                        onPress={getCount}>
                        <Text style={styles.btnTextRegister}>
                          Get Location Count
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => {
                    item.id;
                  }}
                />
              )}
            </ScrollView>
          </View>
        </>
      </View>
    </View>
  );
};

export default FetchHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: width,
    paddingHorizontal: 40,
    height: height,
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
    width: width - 120,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#3E90FC',
    alignItems: 'center',
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
  spinnerTextStyle: {
    color: '#FFF',
  },
  centeredView: {
    flex: 1,
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#3E90FC',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 320,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    marginTop: 15,
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  close: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    alignItems: 'flex-end',
  },
});
