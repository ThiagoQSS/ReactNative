import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";

const CustomTopBar = ({ name = "secretKey", goBack = "/", children }) => {
  return (
    <View style={styles.container}>
      {goBack !== "none" && (
        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => goBack !== "/" ? router.push(goBack) : router.back()}	
        >
          <Icon
            name="angle-left"
            size={30}
            color={Colors.darkGreen}
          />
        </TouchableOpacity>
      )}
      {
        name !== "secretEdit"
        && (
        name === "secretKey" 
        ?
        <View style={{flex: 1}}/>
        : 
        <Text style={styles.title}>
          {name}
        </Text>
        )
      }
      <View style={styles.icons}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: Colors.darkSurface,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  title: {
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    color: Colors.darkGreen,
  },
  iconBox: {
    width: 40,
    height: 40,
    color: Colors.white,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
});

export default CustomTopBar;
