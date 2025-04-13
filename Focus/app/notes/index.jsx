import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Colors from "../../components/constants/Colors";
import CustomTopBar from "../../components/commom/CustomTopBar";
import RightIcon from "../../components/commom/RightIcon";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { router } from "expo-router";
import Spacer from "../../components/commom/Spacer";
import PasswordModal from "../../components/commom/PasswordModal";
import {
  bodyContext,
  NotesContext,
  titleContext,
} from "../../components/contexts/NotesContext";
import NewTaskListModal from "../../components/Focus/modals/NewTaskListModal";
import { getTasks } from "../../services/NotesDB";
import CustomBottomBar from "../../components/commom/CustomBottomBar";
import Icon from "react-native-vector-icons/Fontisto";
import TaskCard from "../../components/notes/TaskCard";

const Notes = () => {
  const { title, id, body, type } = useLocalSearchParams();

  const { bodyS, setBody } = useContext(bodyContext);
  const { notes, setNotes } = useContext(NotesContext);
  const { titleS, setTitle } = useContext(titleContext);

  useEffect(() => {
    setTitle(title);
    setBody(body);
    const initialObjective = type === "note" ? "editar" : "adicionar";
    setObjective(initialObjective);
    getTasks(id).then((tasks) => setTasks(tasks));
  }, []);

  const [starIconName, setStarIconName] = useState("star-o");
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [objective, setObjective] = useState("");
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <View style={styles.container}>
        <CustomTopBar id={id}>
          <RightIcon
            name="lock"
            onPress={() => {
              setPasswordModalVisible(!passwordModalVisible);
            }}
          />
          <RightIcon
            name={starIconName}
            onPress={() => {
              console.log(starIconName);
              setStarIconName(starIconName === "star-o" ? "star" : "star-o");
              //TODO: alterar no banco de dados
            }}
          />
        </CustomTopBar>
        <View style={styles.bodyContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.category}>Categoria</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.date}>2025.03.18</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{titleS}</Text>
            <View style={{ flex: 1 }} />
            <RightIcon
              name="pencil"
              onPress={() =>
                type === "note"
                  ? router.push({
                      pathname: "/notes/edit_note",
                      params: { id, isAdd: false },
                    })
                  : (setObjective("editarLista"), setTaskModalVisible(true))
              }
            />
          </View>
          {type === "note" ? (
            <ScrollView style={styles.scrollContainer}>
              <Text style={styles.text}>{bodyS}</Text>
            </ScrollView>
          ) : (
            <FlatList
              data={tasks}
              renderItem={({ item }) => (
                <TaskCard title={item.title} done={item.done} id={item.id} />
              )}
              style={styles.scrollContainer}
            />
          )}
          <Spacer height={150} />

          <PasswordModal
            isVisible={passwordModalVisible}
            onClose={setPasswordModalVisible}
            onCheck={() => {}}
          />
          <NewTaskListModal
            objective={objective}
            taskModalVisible={taskModalVisible}
            setTaskModalVisible={setTaskModalVisible}
            setTitle={setTitle}
            titleS={titleS}
            setTasks={setTasks}
            id={id}
          />
        </View>
      </View>
      {type === "taskList" && (
        <CustomBottomBar>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setObjective("novaTarefa");
              setTaskModalVisible(true);
            }}
          >
            <Icon name="plus-a" size={20} color={Colors.white} />
          </TouchableOpacity>
        </CustomBottomBar>
      )}
    </>
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
  buttonContainer: {
    backgroundColor: Colors.greenSecondary,
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Notes;
