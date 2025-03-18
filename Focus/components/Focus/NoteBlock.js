import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../Colors";
import { Dimensions } from "react-native";
import { router } from "expo-router";
const { width, height } = Dimensions.get("window");

const NoteBlock = ({ title = "Notes!", id = -1 }) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push({ pathname: "/notes", params: { title, id } })}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: Colors.surface,
    borderRadius: 20,
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
