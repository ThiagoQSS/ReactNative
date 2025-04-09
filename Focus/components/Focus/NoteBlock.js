import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");

const NoteBlock = ({ title = "Notes!", id = -1, body, type = "note" }) => {

  const [starName, setStarName] = useState("star-o");

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({ pathname: "/notes", params: { title, id, body } })
      }
    >
      <TouchableOpacity style={styles.starContainer}>
        <Icon name={starName} size={15} color={Colors.green} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={3}>
          {title}
        </Text>
      </View>
      { type !== "note" &&
        <TouchableOpacity style={styles.checkContainer}>
          <Icon name="check" size={15} color={Colors.green} />
        </TouchableOpacity>
      }
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
    paddingVertical: 10,
  },
  text: {
    color: Colors.white,
    height: 60,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  starContainer: {
    width: "80%",
    height: 50,
    position: "absolute",
    top: 10,
    left: 10,
  },
  checkContainer: {
    width: "80%",
    alignItems: "flex-end",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default NoteBlock;
