import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";

const RightIcon = ({
  name = "close",
  onPress,
  size = 20,
  color = Colors.darkGreen,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={name} size={size} color={color}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RightIcon;
