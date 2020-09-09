import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';


import WelcomeScreen from '../screens/WelcomeScreen'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'

const Stack = createSharedElementStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
    )
}


export default AuthStack