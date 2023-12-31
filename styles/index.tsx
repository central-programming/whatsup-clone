import { StyleSheet } from "react-native";


export const colors = {
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
    success: '#2ecc71',
};

export const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    flexGrow1: {
        flexGrow: 1,
    },
    bgAlert: {
        backgroundColor: colors.alert,
    },
    bgWhite: {
        backgroundColor: colors.white,
    },
    bgTransparent: {
        backgroundColor: colors.transparent,
    },
    bgPrimary: {
        backgroundColor: colors.primary,
    },
    bgSecondary: {
        backgroundColor: colors.secondary,
    },
    bgWarning: {
        backgroundColor: colors.warning,
    },
    bgLight: {
        backgroundColor: colors.light,
    },
    bgDark: {
        backgroundColor: colors.dark,
    },
    bgDisabled: {
        backgroundColor: colors.gray,
    },
    bgSuccess: {
        backgroundColor: colors.success,
    },
    textAlert: {
        color: colors.alert,
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
    xEnd: {
        justifyContent: "flex-end",
    },
    yCenter: {
        alignItems: "center"
    },
    horizontalMargin: {
        marginHorizontal: 15,
    },
    verticalMargin: {
        marginVertical: 15,
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
    input: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.gray,
        marginVertical: 5,
    },
    inputLabel:{
        // backgroundColor: colors.gray,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopLeftRadius: 5,
        borderBottomStartRadius: 5,
    },
    inputText:{
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    submitButton: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        paddingVertical: 10,
        marginVertical: 5,
        marginTop: 20,
    },
    submitButtonLabel: {
        color: colors.dark,
        fontSize: 16,
        fontFamily: 'bold',
    },
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 10,
        height: 150,
        flexGrow: 1,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    pageTableContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    pageContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    pageTitleContainer: {
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
    },
    pageTitle: {
        fontSize: 28,
        fontFamily: 'bold',
        color: colors.dark,
    },
    thematicBreak: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        marginVertical: 10,
    },
    // image profile container
    imageProfileContainer: {
        alignItems: 'center',
        marginVertical: 10,
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 75,
        marginBottom: 10,
      },
      placeholder: {
        width: 100,
        height: 100,
        borderRadius: 75,
        backgroundColor: '#ccc',
        marginBottom: 10,
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      description: {
        fontSize: 14,
        color: '#666',
      },
      dataItemContainer: {
        justifyContent: 'space-between',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        paddingBottom:10
      },
      dataItemImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.gray
      },
      dataItemTitle: {
        fontSize: 18,
        fontFamily: 'bold',
        color: colors.dark,
        marginLeft: 12
      }

});

