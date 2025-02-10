import { StyleSheet } from "react-native";
import ResultImc from ".";

const styles = StyleSheet.create({
    resultImc: {
        flex: 0.8,
        marginTop: 15,
        paddingTop: 15,
        borderRadius: 50,
        alignItems: "center",
        width:"100%",
    },

    numberImc: {
        fontSize: 48,
        color: "#FF0043",
        fontWeight: "bold",
    },

    information: {
        fontSize: 18,
        color: "#FF0043",
        fontWeight: "bold",
    },

    boxShareButton: {
        width: "100%",
        alignItems: "center",
        marginTop: 5,
    },

    shared: {
        backgroundColor: "#1877f2",
        borderRadius: 50,
        padding: 15,
        paddingBottom: 5,
        paddingTop: 5,
    },

    sharedText: {
        color: "#ffffff",
        fontWeight: "bold",
        paddingHorizontal: 30,
    },

});

export default styles