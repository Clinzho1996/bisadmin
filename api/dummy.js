/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Linking,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal, Portal, Button, Provider} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import MapView, {
  PROVIDER,
  Marker,
  Polyline,
  Callout,
  Circle,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
  const data = [
    {
      id: '3',
      name: 'Confidence Emonena',
      email: 'confidencec363@gmail.com',
      phone: '08125306092',
      login_status: 'logged in',
      loggedin_location: null,
      loggedin_time: '10/11/2022 12:05:52',
    },
    {
      id: '4',
      name: 'Confidence Clinton ',
      email: 'confidinho@yahoo.com',
      phone: '08125386092',
      login_status: 'logged in',
      loggedin_location: null,
      loggedin_time: '11/11/2022 03:27:57',
    },
    {
      id: '5',
      name: 'confidence clinton',
      email: 'clintonsworld@yahoo.com',
      phone: '08125306092',
      login_status: 'logged in',
      loggedin_location: null,
      loggedin_time: '02/11/2022 09:03:18',
    },
    {
      id: '6',
      name: 'confidence clinton',
      email: 'test@test.com',
      phone: '08125306092',
      login_status: null,
      loggedin_location: null,
      loggedin_time: '',
    },
    {
      id: '7',
      name: 'Gbolahan',
      email: 'securekonnectltd@gmail.com',
      phone: '8023003602',
      login_status: 'logged in',
      loggedin_location: null,
      loggedin_time: '11/11/2022 06:08:31',
    },
    {
      id: '8',
      name: 'Timilehin Sass',
      email: 'timisass36@gmail.com',
      phone: '08071071638',
      login_status: 'logged in',
      loggedin_location: null,
      loggedin_time: '02/11/2022 09:21:07',
    },
    {
      id: '9',
      name: 'Solo',
      email: 'a@a.com',
      phone: '08023003602',
      login_status: 'logged in',
      loggedin_location: null,
      loggedin_time: '11/11/2022 05:06:53',
    },
    {
      id: '11',
      name: 'Nwanozie Promise',
      email: 'nwanoziep@gmail.com',
      phone: '08085712095',
      login_status: null,
      loggedin_location: null,
      loggedin_time: '',
    },
  ];

  const Item = ({
    name,
    email,
    phone,
    loggedin_time,
    loggedin_location,
    login_status,
  }) => (
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
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Icon name="person" size={34} color={'#000'} />
        <Text
          style={{color: '#3E90FC', fontSize: 18, textTransform: 'capitalize'}}>
          {name}
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
          Login Time: {loggedin_time}
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
          Phone number: {phone}
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
          Email: {email}
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
          Current Location: {loggedin_location}
        </Text>
      </View>
      {/* <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#3E90FC',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff'}}>Show History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff'}}>Delete History</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      name={item.name}
      phone={item.phone}
      email={item.email}
      loggedin_time={item.loggedin_time}
      loggedin_location={item.loggedin_location}
      login_status={item.login_status}
    />
  );

  const [visible, setVisible] = React.useState(false);
  const [visibleTwo, setVisibleTwo] = React.useState(false);
  const [visibleThree, setVisibleThree] = React.useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const showModal = () => setVisibleTwo(true);
  const hideModal = () => setVisibleTwo(false);
  const showModalThree = () => setVisibleThree(true);
  const hideModalThree = () => setVisibleThree(false);
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
          <ScrollView>
            {data && (
              <FlatList
                data={data}
                renderItem={renderItem}
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
              <Icon name="ellipsis-vertical-outline" size={30} color={'#FFF'} />
            </TouchableOpacity>
          }
          style={{paddingTop: 40}}>
          <Menu.Item
            title="Normal Map"
            style={{fontSize: 14, color: '#5C5C5C'}}
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
          rotateEnabled={true}>
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
