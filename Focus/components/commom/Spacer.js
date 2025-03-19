import React from "react";
import { View, StyleSheet } from "react-native";

const Spacer = ({width = 16, height = 8, flex = 0}) => {
    return (
        <View style={{width: width, height: height, flex: flex}}/>
    );
};

const styles = StyleSheet.create({
    styles
});

export default Spacer;