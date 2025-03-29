import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../components/constants/Colors";
import CustomTopBar from "../../components/commom/CustomTopBar";
import RightIcon from "../../components/commom/RightIcon";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { router } from "expo-router";
import Spacer from "../../components/commom/Spacer";
import PasswordModal from "../../components/commom/PasswordModal";
import { bodyContext, titleContext } from "../../components/contexts/NotesContext";

const Notes = () => {
  const { title, id, body } = useLocalSearchParams();

  const { bodyS, setBody } = useContext(bodyContext);
  const { titleS, setTitle } = useContext(titleContext);
  
  useEffect(() => {
    setTitle(title);
    setBody(body);
  }, []);

  const [starIconName, setStarIconName] = useState("star-o");
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  return (
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
      <PasswordModal
        isVisible={passwordModalVisible}
        onClose={setPasswordModalVisible}
        onCheck={() => {}}
      />
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
              router.push({
                pathname: "/notes/edit_note",
                params: { id, isAdd: false },
              })
            }
          />
        </View>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.text}>{bodyS}</Text>
          <Spacer height={150} />
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
