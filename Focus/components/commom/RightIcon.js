import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../Colors";
import Icon from "react-native-vector-icons/FontAwesome";

const RightIcon = ({ name = "close", onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon name={name} size={20} color={Colors.darkGreen} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default RightIcon;