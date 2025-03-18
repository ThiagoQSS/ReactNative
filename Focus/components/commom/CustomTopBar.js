import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";

const CustomTopBar = ({ name = "CustomTopBar", goBack = "back" }) => {
  return (
    <View style={styles.container}>
      {goBack !== "none" && (
        <TouchableOpacity 
            style={styles.icon} 
            onPress={() => 
                goBack === "back"
                ?
                router.back()
                : 
                router.push("/home")
            }>
          <Icon name="angle-left" size={30} color={Colors.darkPurple} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { right: goBack !== "none" && 25 }]}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: Colors.darkSurface,
    flexDirection: "row",
  },
  title: {
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    color: Colors.white,
  },
  icon: {
    padding: 20,
    color: Colors.white,
  },
});

export default CustomTopBar;
