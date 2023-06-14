import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { KeyboardStatic } from "react-native";
import { styles } from "../styles";
import { Form } from "../types/form";


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

export const getBackgroundColorStyle = (backgroundColor: 'bgAlert' | 'bgPrimary' | 'bgSecondary' | 'bgSuccess' | 'bgWarning' | 'bgDark' | 'bgLight',disabled = false) => {
    if (disabled) {
        return styles.bgDisabled;
    }
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

export class AuthUI {
    formState: string;
    form: Form;
    setFormState: (value: React.SetStateAction<string>) => void
    setKeyboardShown: (value: React.SetStateAction<boolean>) => void
    setForm: (value: React.SetStateAction<Form>) => void;
    constructor(formState: string, form: { firstName: string; lastName: string; email: string; password: string; }, setFormState: (value: React.SetStateAction<string>) => void, setKeyboardShown: (value: React.SetStateAction<boolean>) => void, setForm: (value: React.SetStateAction<Form>) => void) {
        this.formState = formState;
        this.form = form;
        this.setFormState = setFormState;
        this.setKeyboardShown = setKeyboardShown;
        this.setForm = setForm;
    }

    toggleFormState = () => {
        this.setFormState((prevFormState) => prevFormState === 'login' ? 'register' : 'login')
    }

    isFormFilled = () => {
        if (this.formState === 'login') {
            return this.form.email !== '' && this.form.password !== ''
        } else {
            return this.form.firstName !== '' && this.form.lastName !== '' && this.form.email !== '' && this.form.password !== ''
        }
    }

    handleOnChangeText = (key: string, value: string) => {
        this.setForm((prevForm) => ({ ...prevForm, [key]: value }))
    }



    handleKeyboardDidShow = () => {
        this.setKeyboardShown(true);
    }

    handleKeyboardDidHide = () => {
        this.setKeyboardShown(false);
    }

}