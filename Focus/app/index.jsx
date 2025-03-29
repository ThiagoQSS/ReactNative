import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import Colors from "../components/constants/Colors";
import CustomTopBar from "../components/commom/CustomTopBar";
import CustomBottomBar from "../components/commom/CustomBottomBar";
import NoteBlock from "../components/Focus/NoteBlock";
import Icon from "react-native-vector-icons/Fontisto";
import { router } from "expo-router";
import { deleteAllNotes, getNotes } from "../services/NotesDB";
import { NotesContext } from "../components/contexts/NotesContext";

export default function Focus() {
  const [modalVisible, setModalVisible] = useState(false);

  const { notes, setNotes } = useContext(NotesContext);

  useEffect(() => {
    getNotes().then((notes) => setNotes(notes));
  }, []);

  return (
    <View style={styles.container}>
      <CustomTopBar name="Focus" goBack="none" />
      <View style={{ flex: 1, width: "85%", alignSelf: "center" }}>
        <FlatList
          style={styles.flatlist}
          showsVerticalScrollIndicator={false}
          data={[...notes].reverse()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginVertical: 15,
          }}
          renderItem={({ item }) => (
            <NoteBlock
              key={item.id}
              id={item.id}
              title={item.title}
              isFavorite={item.isFavorite}
              body={item.body}
            />
          )}
        />
      </View>
      <CustomBottomBar>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Icon name="plus-a" size={20} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            deleteAllNotes().then(() =>
              getNotes().then((notes) => setNotes(notes))
            );
          }}
        >
          <Icon name="trash" size={20} color={Colors.white} />
        </TouchableOpacity>
      </CustomBottomBar>
      <Modal animationType="fade" visible={modalVisible} transparent>
        <View style={styles.modalCentered}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                { borderBottomWidth: 1, borderColor: Colors.darkGreen },
              ]}
              onPress={() => {
                router.push({
                  pathname: "/notes/edit_note",
                  params: { isAdd: true },
                });
                setModalVisible(false);
              }}
            >
              <Text style={styles.option}>Nota</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.option}>Lista de Verificação</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkSurface,
  },
  flatlist: {
    width: "100%",
    alignSelf: "center",
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: Colors.greenSecondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  modalCentered: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flex: 1,
  },
  modalContent: {
    width: "50%",
    height: 100,
    borderRadius: 10,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    fontSize: 16,
    color: Colors.green,
  },
  optionButton: {
    width: "90%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});
