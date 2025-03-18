import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Colors from "../components/Colors";
import CustomTopBar from "../components/commom/CustomTopBar";
import NoteBlockFakeData from "../components/fakeDatas/fakeData";
import NoteBlock from "../components/Focus/NoteBlock";

export default function Focus() {
  return (
    <View style={styles.container}>
      <CustomTopBar name="Focus" goBack="none" />
      <View style={{ flex: 1, width: "85%", alignSelf: "center"}}>
        <FlatList
          style={styles.flatlist}
          showsVerticalScrollIndicator={false}
          data={NoteBlockFakeData}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", marginVertical: 10 }}
          renderItem={({item}) => (
            <NoteBlock
              key={item.id}
              title={item.title}
              isFavorite={item.isFavorite}
            />
          )}
        />
      </View>
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
});
