import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../components/Colors";
import CustomTopBar from "../../components/commom/CustomTopBar";
import RightIcon from "../../components/commom/RightIcon";

const Notes = () => {
  const title = "Notes";

  return (
    <View style={styles.container}>
      <CustomTopBar>
        <RightIcon name="plus" />
        <RightIcon name="lock" />
        <RightIcon name="star" />
      </CustomTopBar>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Notes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkSurface,
  },
  text: {
    color: Colors.white,
  },
  textContainer: {
    width: "95%",
    alignSelf: "center",
  },
});

export default Notes;
