import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Colors from "../../constants/Colors";

import {
  addToItems,
  editTask,
  getItems,
  addTask,
  getTasks,
  editTaskList,
} from "../../../services/NotesDB";
const NewTaskListModal = ({
  taskModalVisible,
  setTaskModalVisible,
  setTitle,
  setTasks,
  setNotes,
  titleS,
  objective = "adicionar",
  id,
}) => {
  const buttonName = objective !== "adicionar" ? "Salvar" : "Criar";
  const modalName = objective === "adicionar" ? "lista" : "tarefa";

  const [taskTitle, setTaskTitle] = useState(titleS);

  return (
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
            <Text style={styles.title}>Nome da {modalName}</Text>
            <TextInput
              value={objective !== "novaTarefa" ? titleS : taskTitle}
              onChangeText={(text) =>
                objective !== "novaTarefa" ? setTitle(text) : setTaskTitle(text)
              }
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
                style={styles.createButton}
                onPress={() => {
                  console.log(objective);
                  objective === "adicionar"
                    ? addToItems(titleS, "", "taskList").then(() =>
                        getItems()
                          .then((notes) => setNotes(notes))
                          .catch((err) =>
                            console.log("error adding tasklist: ", err)
                          )
                      )
                    : objective === "editar"
                    ? editTask(id, titleS).then(() => {
                        getItems()
                          .then((notes) => setTasks(notes))
                          .catch((err) =>
                            console.log("error editing task: ", err)
                          );
                      })
                    : objective === "novaTarefa"
                    ? addTask(id, taskTitle).then(() => {
                        getTasks(id)
                          .then((tasks) => setTasks(tasks))
                          .catch((err) =>
                            console.log("error adding task: ", err)
                          );
                      })
                    : objective === "editarLista" &&
                      editTaskList(id, titleS).then(() => {
                        getTasks(id)
                          .then((tasks) => setTasks(tasks))
                          .catch((err) =>
                            console.log("error adding task: ", err)
                          );
                      });
                  setTaskModalVisible(false);
                }}
              >
                <Text style={styles.option}>{buttonName}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  createButton: {
    flex: 1,
    alignItems: "center",
    height: 30,
    marginTop: 10,
  },
});

export default NewTaskListModal;
