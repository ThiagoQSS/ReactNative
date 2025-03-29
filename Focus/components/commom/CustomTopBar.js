import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
import { addToNotes, editNote, getNotes } from "../../services/NotesDB";
import {
  NotesContext,
  titleContext,
  bodyContext,
} from "../contexts/NotesContext";

const CustomTopBar = ({
  name = "",
  goBack = "/default",
  children,
  isAdd = false,
  id = -1,
  body,
  title,
}) => {
  const { notesS, setNotes } = useContext(NotesContext);
  const { titleS, setTitle } = useContext(titleContext);
  const { bodyS, setBody } = useContext(bodyContext);

  useEffect(() => {
    setTitle(title);
    setBody(body);
  }, []);

  return (
    <View style={styles.container}>
      {goBack !== "none" && (
        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => {
            if (goBack !== "/default") router.push(goBack);
            else if (isAdd === "true") {
              addToNotes(titleS, bodyS).then(() =>
                getNotes()
                  .then((notes) => setNotes(notes))
                  .catch((err) => console.log("error adding notes: ", err))
              );
              router.back();
            } else {
              editNote(id, titleS, bodyS).then(() => {
                getNotes()
                  .then((notes) => {
                    setNotes(notes);
                    setTitle(titleS);
                    setBody(bodyS);
                    //console.log("after edit: ", notes);
                    router.back();
                  })
                  .catch((err) => console.log("error editing note: ", err));
              });
            }
          }}
        >
          <Icon name="angle-left" size={30} color={Colors.darkGreen} />
        </TouchableOpacity>
      )}
      {name === "" ? (
        <View style={{ flex: 1 }} />
      ) : (
        <Text style={styles.title}>{name}</Text>
      )}
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
