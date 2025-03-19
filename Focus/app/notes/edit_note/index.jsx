import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Colors from "../../../components/Colors";
import CustomTopBar from "../../../components/commom/CustomTopBar";
import RightIcon from "../../../components/commom/RightIcon";
import { useLocalSearchParams } from "expo-router/build/hooks";
import Spacer from "../../../components/commom/Spacer";

const EditNote = () => {
  const { title, id, body } = useLocalSearchParams();

  const [newTitle, setTitle] = useState(title);
  const [newBody, setBody] = useState(body);

  return (
    <View style={styles.container}>
      <CustomTopBar name={"secretEdit"}>
        <TextInput
          placeholder="Escreva o título aqui..."
          style={styles.title}
          placeholderTextColor={Colors.textTerciary}
          value={newTitle}
          onChangeText={(text) => setTitle(text)}
        />
      </CustomTopBar>
      <View style={styles.bodyContainer}>
        <ScrollView style={styles.scrollContainer}>
          <TextInput
            style={styles.text}
            value={newBody}
            onChangeText={(text) => setBody(text)}
            multiline
          />
					<Spacer height={100} width={"100%"}/>
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
