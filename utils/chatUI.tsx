import { KeyboardStatic } from "react-native";


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