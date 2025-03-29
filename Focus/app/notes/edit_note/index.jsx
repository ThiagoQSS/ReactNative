import React, { useState, useReducer, useContext } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Colors from "../../../components/constants/Colors";
import CustomTopBar from "../../../components/commom/CustomTopBar";
import { useLocalSearchParams } from "expo-router/build/hooks";
import Spacer from "../../../components/commom/Spacer";
import {
  NotesContext,
  bodyContext,
  titleContext,
} from "../../../components/contexts/NotesContext";
const EditNote = () => {
  const { id, isAdd = false } = useLocalSearchParams();

  const { notes, setNotes } = useContext(NotesContext);
  const { titleS, setTitle } = useContext(titleContext);
  const { bodyS, setBody } = useContext(bodyContext);

  return (
    <View style={styles.container}>
      <CustomTopBar
        title={titleS}
        body={bodyS}
        isAdd={isAdd}
        notes={notes}
        setNotes={setNotes}
        setTitle={setTitle}
        setBody={setBody}
        id={id}
      >
        <TextInput
          placeholder="Título"
          placeholderTextColor={Colors.textTerciary}
          style={styles.title}
          value={titleS}
          onChangeText={(text) => setTitle(text)}
        />
      </CustomTopBar>
      <View style={styles.bodyContainer}>
        <ScrollView style={styles.scrollContainer}>
          <TextInput
            placeholder="Escreva algo..."
            placeholderTextColor={Colors.textTerciary}
            style={styles.text}
            value={bodyS}
            onChangeText={(text) => setBody(text)}
            multiline
          />
          <Spacer height={100} width={"100%"} />
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
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 25,
    color: Colors.white,
    width: "100%",
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
    height: "100%",
    alignSelf: "center",
  },
  titleInput: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default EditNote;
