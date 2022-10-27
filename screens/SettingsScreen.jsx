import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";

import { SharedElement } from "react-navigation-shared-element";
import AppHeading from "../components/AppHeading";
import AppText from "../components/AppText";

import colors from "../config/colors";
import Swiper from "react-native-swiper";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

export default function SettingsScreen({ navigation, route }) {
  const { data } = route.params;
  //const story = navigation.getParam('data');
  //console.log(data._id);

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={styles.container}
    >
      <SharedElement id={`item.${data._id}.settings`} style={styles.cover}>
        <Image
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          source={{
            uri: `http://192.168.1.5:3000/public/img/stories/${data.images[0]}`,
          }}
        />
      </SharedElement>

      <View style={styles.content}>
        <SharedElement id={`item.${data._id}.title`}>
          <View
            style={{
              padding: 10,
              flexDirection: "column",
              alignItems: "start",
              marginTop: 20,
            }}
          >
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={24}
              color={colors.primary}
            />
            <AppHeading
              color={colors.darkGrey}
              size={28}
              style={{ marginLeft: 10 }}
              id={`item.${data.title}.title`}
            >
              {data.title}
            </AppHeading>
          </View>
        </SharedElement>
        <SharedElement id={`item.${data._id}.date`}>
          <View style={{ alignItems: "flex-start", paddingHorizontal: 10 }}>
            <AppText size={16} color={colors.primary}>
              {moment(data.createdAt).format("LL")}
            </AppText>
          </View>
        </SharedElement>

        <View style={styles.description}>
          <AppText
            style={{ textAlign: "left", lineHeight: 28 }}
            size={18}
            color={colors.darkGrey}
          >
            {data.description}
          </AppText>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="tooltip-image"
            size={24}
            color={colors.primary}
          />
          <AppHeading
            style={{ marginLeft: 10 }}
            color={colors.darkGrey}
            size={28}
          >
            Moments
          </AppHeading>
        </View>

        <FlatList
          style={styles.slider}
          data={data.images}
          keyExtractor={(item) => item}
          horizontal
          renderItem={({ item }) => (
            <View
              style={{
                width: width,
                height: 350,
                marginHorizontal: 10,
                borderRadius: 15,
                overflow: "hidden",
              }}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
                source={{
                  uri: `http://192.168.1.5:3000/public/img/stories/${item}`,
                }}
              />
            </View>
          )}
        />
      </View>

      <StatusBar hidden />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    position: "absolute",
  },
  cover: {
    width: "100%",
    height: 350,
    overflow: "auto",
  },
  content: {
    width: "80%",
    flex: 1,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  description: {
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginTop: 20,
    alignItems: "flex-start",
    borderTopRightRadius: 75,
    borderBottomLeftRadius: 45,
    backgroundColor: colors.white,
  },
  slider: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
});
