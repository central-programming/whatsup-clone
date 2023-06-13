import { StyleSheet } from "react-native";


const colors = {
    primary: '#3498db',
    secondary: '#2ecc71',
    alert: '#e74c3c',
    warning: '#f1c40f',
    info: '#3498db',
    light: '#ecf0f1',
    dark: '#34495e',
    gray: '#bdc3c7',
    white: '#fff',
    black: '#000',
    transparent: 'transparent',
};

export const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
    },
    spread: {
        justifyContent: "space-between",
    },
    column: {
        flexDirection: "column",
    },
    xCenter: {
        justifyContent: "center",
    },
    yCenter: {
        alignItems: "center"
    },
    label: {
        fontFamily: 'regular',
        fontSize: 16,
        color: colors.dark,
    },
    chatFooterBar: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    chatFooterTextBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: colors.gray,
        paddingLeft: 10,
        marginHorizontal: 15,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    colorAlert:{
        color: colors.primary
    },
    colorWhite:{
        color: colors.white
    },
    chatFooterInactiveButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.transparent
    },
    chatFooterActiveButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        borderRadius: 50,
        width: 40,
    },

});

