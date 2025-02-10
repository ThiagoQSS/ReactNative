import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContent: {
        width: "90%",
        height: "auto",
        backgroundColor: "#000000",
        marginBottom: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    logoBitcoin: {
        width: 40,
        height: 40,
        marginLeft: 2,
    },
    boxLogo: {
        flexDirection: "row",
        alignItems: "center",
    },
    contextLeft: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "40%",
    },
    contextRight: {
        alignItems: "flex-end",
        width: "60%",
    },
    dayCotation: {
        fontSize: 16,
        paddingLeft: 22,
        color: "#ffffff",
        fontWeight: "bold",
    },
    price: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold"
    },
});

export default styles