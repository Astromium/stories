import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from "./HomeNavigation";

import AccountScreen from "../screens/AccountScreen";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddStoryScreen from "../screens/AddStoryScreen";
import AddButton from "../components/AddButton";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: colors.white,
        activeTintColor: colors.primary,
        inactiveBackgroundColor: colors.white,
        inactiveTintColor: "rgba(0,0,0,0.5)",
        style: { borderTopWidth: 0 },

        labelStyle: {
          fontFamily: "NunitoSans-Regular",
          paddingVertical: 2,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="addStory"
        component={AddStoryScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <AddButton onPress={() => navigation.navigate("addStory")} />
          ),
        })}
      />
      <Tab.Screen
        name="account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <AddButton onPress={() => navigation.navigate("settings")} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
