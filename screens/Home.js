/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Menu, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal, Portal} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [visible, setVisible] = React.useState(false);
  const [visibleTwo, setVisibleTwo] = React.useState(false);
  const [visibleThree, setVisibleThree] = React.useState(false);
  const [visibleFour, setVisibleFour] = React.useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const showModal = () => setVisibleTwo(!visibleTwo);
  const hideModal = () => setVisibleTwo(false);
  const showModalThree = () => setVisibleThree(true);
  const hideModalThree = () => setVisibleThree(false);
  const showModalFour = () => setVisibleFour(true);
  const hideModalFour = () => setVisibleFour(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 15,
  };

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    });
  }, []);

  // define state variables
  const [listData, setListData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingTwo, setLoadingTwo] = useState(true);

  const getData = () => {
    return fetch('https://hiousapp.com/api/admin/fetch_users.php')
      .then(response => response.json())
      .then(json => setListData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visibleTwo}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text
            style={{
              fontWeight: '600',
              textAlign: 'center',
              fontSize: 20,
              color: '#000',
            }}>
            BIS ADMIN - Employees List
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 20,
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
                data={listData}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <View
                    style={{
                      backgroundColor: '#e8e8e8',
                      padding: 10,
                      borderRadius: 10,
                      margin: 10,
                    }}>
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
                        {item.name}
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
                        Login Time: {item.loggedin_time}
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
                        Phone number: {item.phone}
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
                        Email: {item.email}
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
                        Current Location: {item.loggedin_location}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#3E90FC',
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          borderRadius: 10,
                          marginHorizontal: 20,
                          marginVertical: 10,
                        }}
                        key={item.id}
                        onPress={() => {
                          navigation.navigate('FetchHistory');
                          showModal();
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 16,
                            padding: 5,
                            color: '#fff',
                          }}>
                          Show Employee History
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            )}
          </ScrollView>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={visibleThree}
          onDismiss={hideModalThree}
          contentContainerStyle={containerStyle}>
          <Text
            style={{
              fontWeight: '600',
              textAlign: 'center',
              fontSize: 20,
              color: '#000',
              textDecorationStyle: 'double',
            }}>
            About the App - Instructions
          </Text>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontSize: 16,
              marginTop: 20,
            }}>
            Admin have to register for all employees with the admin app. After
            registration admin have to provide credentials to the employees.
            Everytime admin will get push notifications when every employee
            shares location (turn on available status) or stops location (turn
            off available status) from their employee app. Admin can see all
            available employee (who shares their location) Real time live
            location all the time. Admin will alo get all location history of
            the availble employees (who share their location)
          </Text>
        </Modal>
      </Portal>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            size="large"
            color="#3E90FC"
          />
        }>
        <View
          style={{
            backgroundColor: '#3E90FC',
            paddingHorizontal: 20,
            paddingVertical: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Icon name="person-circle-outline" size={40} color="yellow" />
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
              BIS - Admin
            </Text>
          </View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            onPress={openMenu}
            transparent={true}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Icon
                  name="ellipsis-vertical-outline"
                  size={30}
                  color={'#FFF'}
                />
              </TouchableOpacity>
            }
            style={{paddingTop: 40}}>
            <Menu.Item
              title="Normal Map"
              style={{fontSize: 14, color: '#5C5C5C'}}
            />
            <Menu.Item
              title="Register Employee"
              style={{fontSize: 14, color: '#5C5C5C'}}
              onPress={() => navigation.navigate('SignUp')}
            />
            <Menu.Item
              title="Log out"
              style={{fontSize: 14, color: '#5C5C5C'}}
              onPress={() => navigation.navigate('Login')}
            />
          </Menu>
        </View>
        <View style={{height: windowHeight}}>
          <MapView
            style={styles.map}
            region={position}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            showsBuildings={true}
            showsTraffic={true}
            showsIndoors={true}
            rotateEnabled={true}
            showsIndoorLevelPicker={true}>
            <Marker
              draggable
              coordinate={position}
              // eslint-disable-next-line no-alert
              onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={'BIS Admin'}
              description={'You are currently here'}
            />
          </MapView>
        </View>
        <View style={styles.tab}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={showModal}>
            <Icon name="refresh-outline" color="yellow" size={25} />
            <Text style={{color: 'yellow', fontSize: 14}}>Empl. History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.local}
            onPress={requestLocationPermission}>
            <Icon name="location" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={showModalThree}>
            <Icon name="information-circle-outline" color="#fff" size={25} />
            <Text style={{color: '#fff', fontSize: 14}}>instructions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#3E90FC',
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 22,
    marginTop: -130,
  },
  local: {
    backgroundColor: 'red',
    padding: 20,
    borderWidth: 0,
    borderRadius: 50,
    marginTop: -40,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
