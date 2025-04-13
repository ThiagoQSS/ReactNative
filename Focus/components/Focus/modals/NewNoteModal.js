import React from "react";
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

import { router } from "expo-router";

const NewNoteModal = ({ newModalVisible, setNewModalVisible, setTaskModalVisible, setTitle, setBody }) => {
    return (
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
                setTitle("");
                setNewModalVisible(false);
                setTaskModalVisible(true);
              }}
            >
              <Text style={styles.option}>Lista de Verificação</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal> 
    );
}

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

export default NewNoteModal;