import React, { Suspense } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../components/Colors";
import CustomTopBar from "../../components/commom/CustomTopBar";
import RightIcon from "../../components/commom/RightIcon";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { router } from "expo-router";
import Spacer from "../../components/commom/Spacer";

const Notes = () => {
  const { title, id, body } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <CustomTopBar>
        <RightIcon name="plus" />
        <RightIcon name="lock" />
        <RightIcon name="star" />
      </CustomTopBar>
      <View style={styles.bodyContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.category}>Categoria</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.date}>2025.03.18</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{title}</Text>
          <View style={{ flex: 1 }} />
          <RightIcon
            name="pencil"
            onPress={() =>
              router.push({
                pathname: "/notes/edit_note",
                params: { title, id, body },
              })
            }
          />
        </View>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.text}>{body}...</Text>
          <Spacer height={150}/>
        </ScrollView>
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
  scrollContainer: {
    marginTop: 15,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 25,
    color: Colors.white,
  },
  category: {
    fontSize: 13,
    color: Colors.darkGreen,
  },
  date: {
    fontSize: 12,
    color: Colors.textTerciary,
  },
  bodyContainer: {
    width: "90%",
    alignSelf: "center",
  },
});

export default Notes;
