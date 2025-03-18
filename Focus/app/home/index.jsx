import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomTopBar from "../../components/commom/CustomTopBar";
import Colors from "../../components/Colors";

export default function Home() {
  return (
    <>
      <CustomTopBar name="Home"/>
      <View style={styles.container}>
        <Text>Meu deus do ceu</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: Colors.darkSurface,
  },
});