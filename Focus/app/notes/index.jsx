import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../components/Colors";

const Notes = () => {
    return (
        <View style={styles.container}>
            <Text>Notes</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.darkSurface,
    },
});

export default Notes;