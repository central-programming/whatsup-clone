import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { KeyboardStatic } from "react-native";
import { styles } from "../styles";


export class ChatUI {
    Keyboard: KeyboardStatic;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    constructor(keyboard: KeyboardStatic, message: string, setMessage: React.Dispatch<React.SetStateAction<string>>) {
        this.Keyboard = keyboard;
        this.message = message;
        this.setMessage = setMessage;
    }
    dismissKeyboard = () => {
        this.Keyboard.dismiss();
    }
    textfieldChange = (text: string) => {
        this.setMessage(text)
    }
    isTextfieldEmpty = () => {
        return this.message.length === 0;
    }
    resetTextfield = () => {
        this.setMessage('')
    }

}


export function selectedIcon (icon: string,color: string) {
    switch (icon) {
        case "person":
            return <Ionicons name="person" size={24} color={color}/>
        case "email":
            return <MaterialIcons name="email" size={24} color={color} />
            case "password":
                return <MaterialCommunityIcons name="form-textbox-password" size={24} color={color} />
            case "phone":
                return <Entypo name="phone" size={24} color={color} />
        default:
            return <Ionicons name="person" size={24} color={color} />
    }
}

export const getBackgroundColorStyle = (backgroundColor: 'bgAlert' | 'bgPrimary' | 'bgSecondary' | 'bgSuccess' | 'bgWarning' | 'bgDark' | 'bgLight') => {
    switch (backgroundColor) {
        case 'bgAlert':
            return styles.bgAlert;
        case 'bgPrimary':
            return styles.bgPrimary;
        case 'bgSecondary':
            return styles.bgSecondary;
        case 'bgSuccess':
            return styles.bgSuccess;
        case 'bgWarning':
            return styles.bgWarning;
        case 'bgDark':
            return styles.bgDark;
        case 'bgLight':
            return styles.bgLight;
        default:
            return styles.bgPrimary;
    }
}