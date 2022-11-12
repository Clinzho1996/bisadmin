import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Onboarding from './screens/Onboarding';
import {NavigationContainer} from '@react-navigation/native';
import Forgot from './screens/Forgot';
import Reset from './screens/Reset';
import RegisterAdmin from './screens/RegisterAdmin';
import Changepassword from './screens/Changepassword';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          tabBarVisible: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="RegisterAdmin" component={RegisterAdmin} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Changepass" component={Changepassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
