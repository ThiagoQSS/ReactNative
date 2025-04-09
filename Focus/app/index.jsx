import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import Colors from "../components/constants/Colors";
import CustomTopBar from "../components/commom/CustomTopBar";
import CustomBottomBar from "../components/commom/CustomBottomBar";
import NoteBlock from "../components/Focus/NoteBlock";
import Icon from "react-native-vector-icons/Fontisto";
import { router } from "expo-router";
import { deleteAllNotes, getNotes } from "../services/NotesDB";
import {
  NotesContext,
  titleContext,
  bodyContext,
} from "../components/contexts/NotesContext";

export default function Focus() {
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);

  const { notes, setNotes } = useContext(NotesContext);
  const { titleS, setTitle } = useContext(titleContext);
  const { bodyS, setBody } = useContext(bodyContext);

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
            setNewModalVisible(!newModalVisible);
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
      <Modal animationType="fade" visible={newModalVisible} transparent>
        <Pressable
          style={styles.modalCentered}
          onPress={() => setNewModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setTitle("");
                setBody("");
                router.push({
                  pathname: "/notes/edit_note",
                  params: { isAdd: true },
                });
                setNewModalVisible(false);
              }}
            >
              <Text style={styles.option}>Nota</Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: Colors.darkGreen,
                width: "90%",
              }}
            />
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setNewModalVisible(false);
                setTaskModalVisible(true);
              }}
            >
              <Text style={styles.option}>Lista de Verificação</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <Modal animationType="fade" visible={taskModalVisible} transparent>
        <Pressable
          style={styles.modalCentered}
          onPress={() => setTaskModalVisible(false)}
        >
          <View style={styles.taskModalContent}>
            <View
              style={{
                width: "90%",
                alignItems: "center",
                alignSelf: "center",
                padding: 10,
              }}
            >
              <Text style={styles.title}>Nome da lista</Text>
              <TextInput
                placeholder="Escolha um nome..."
                placeholderTextColor={Colors.textTerciary}
                borderBottomWidth={1}
                borderColor={Colors.darkGreen}
                style={styles.input}
              />
              <View
                style={{ flexDirection: "row", width: "100%", marginTop: 10 }}
              >
                <TouchableOpacity
                  style={{ flex: 1, alignItems: "center", height: 30, marginTop: 10 }}
                  onPress={() => setTaskModalVisible(false)}
                >
                  <Text style={styles.option}>Criar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
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
    borderRadius: 10,
    height: 100,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  taskModalContent: {
    width: "70%",
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
  title: {
    fontSize: 16,
    color: Colors.green,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: Colors.darkGreen,
    color: Colors.white,
    height: 40,
  },
});
