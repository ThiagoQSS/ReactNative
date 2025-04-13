import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Colors from "../constants/Colors";
import { isItDone } from "../../services/NotesDB";

const TaskCard = ({ title, done, id }) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    isItDone.then((result) => {
      setIsDone(result === 1 ? true : false);
    });
  }, []);
  return (
    <TouchableOpacity style={styles.container} onLongPress={() => {}}>
      <TouchableOpacity
        styles={styles.checkButtonContainer}
        onPress={() => {
          setIsDone(isDone ? false : true);
        }}
      >
        <Icon
          name={isDone ? "check" : "square-o"}
          size={15}
          color={Colors.green}
          style={styles.checkButton}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      <View style={{ flex: 1 }} />
      <Icon
        name="ellipsis-v"
        size={15}
        color={Colors.textSecondary}
        style={styles.rightIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.darkerSurface,
  },
  text: {
    color: Colors.textPrimary,
    paddingHorizontal: 10,
  },
  checkButton: {
    paddingLeft: 10,
  },
  checkButtonContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  rightIcon: {
    paddingHorizontal: 20,
  },
});

export default TaskCard;
