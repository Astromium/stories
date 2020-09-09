import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import AuthContext from './context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage'

import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './navigation/AuthNavigator';
import HomeStack from './navigation/HomeNavigation'
import TabNavigator from './navigation/TabNavigator';

const fetchFont = async () => {
  return Font.loadAsync({
    'NunitoSans-Bold': require('./assets/Fonts/NunitoSans-Bold.ttf'),
    'NunitoSans-Regular': require('./assets/Fonts/NunitoSans-Regular.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      setUser(JSON.parse(user));
    } catch (err) {
      setUser(null)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const onAuth = async (user) => {
    setUser(user);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (err) {
      console.log(err)
    }
  }

  const onLogout = async () => {
    setUser(null)
    try {
      await AsyncStorage.removeItem('user', JSON.stringify(user))
    } catch (err) {
      console.log(err)
    }
  }

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFont} onFinish={() => setFontLoaded(true)} />
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{
        user,
        onAuth,
        onLogout
      }}>
        {user === null ? <AuthStack /> : <TabNavigator />}
      </AuthContext.Provider>
    </NavigationContainer>
  );
}


