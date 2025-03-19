import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../Colors";
import { Dimensions } from "react-native";
import { router } from "expo-router";
const { width, height } = Dimensions.get("window");

const NoteBlock = ({ title = "Notes!", id = -1, body }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({ pathname: "/notes", params: { title, id, body } })
      }
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.38,
    height: width * 0.38,
    backgroundColor: Colors.surface,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.white,
    height: 30,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NoteBlock;
