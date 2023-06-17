import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { KeyboardStatic } from "react-native";
import { styles } from "../styles";
import { Form } from "../types/form";
import firebaseApp from "./firebase-config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";

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


export function selectedIcon(icon: string, color: string) {
    switch (icon) {
        case "person":
            return <Ionicons name="person" size={24} color={color} />
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

export const getBackgroundColorStyle = (backgroundColor: 'bgAlert' | 'bgPrimary' | 'bgSecondary' | 'bgSuccess' | 'bgWarning' | 'bgDark' | 'bgLight', disabled = false) => {
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
    isLoading: boolean;
    setIsLoading: (value: React.SetStateAction<boolean>) => void;
    constructor(formState: string, form: Form, setFormState: (value: React.SetStateAction<string>) => void, setKeyboardShown: (value: React.SetStateAction<boolean>) => void, setForm: (value: React.SetStateAction<Form>) => void, isLoading: boolean, setIsLoading: (value: React.SetStateAction<boolean>) => void) {
        this.formState = formState;
        this.form = form;
        this.setFormState = setFormState;
        this.setKeyboardShown = setKeyboardShown;
        this.setForm = setForm;
        this.isLoading = isLoading;
        this.setIsLoading = setIsLoading;
    }
    get loading() {
        return this.isLoading;
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
    handleFormError = (errorMessage: string) => {
        this.setForm((prevForm) => ({ ...prevForm, errorMessage }))
        setTimeout(() => {
            this.setForm((prevForm) => ({ ...prevForm, errorMessage: '' }))
        }, 4000)
    }
    login = async () => {
        const { email, password } = this.form;
        const app = firebaseApp();
        const auth = getAuth(app);
        try {
            this.toggleLoading();
            const {
                user: { uid }
            } = await signInWithEmailAndPassword(auth, email, password);
            this.getUserData(uid);
        } catch (error: any) {
            this.toggleLoading();
            const errorMessage = this.extractErrorDetails(error.message);
            this.handleFormError(errorMessage);
        }
    }
    register = async () => {
        const { firstName, lastName, email, password } = this.form;
        const app = firebaseApp();
        const auth = getAuth(app);
        try {
            this.toggleLoading();
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const { uid } = result.user;
            const user = await this.createUserData(uid, firstName, lastName, email);
            console.log( user);
        } catch (error: any) {
            this.toggleLoading();
            console.log(error.code);

            const errorMessage = this.extractErrorDetails(error.message);
            this.handleFormError(errorMessage);
        }
    }
    createUserData = async (uid: string, firstName: string, lastName: string, email: string) => {
        const fullName = `${firstName} ${lastName}`.toLocaleLowerCase();
        const userData = {
            firstName,
            lastName,
            fullName,
            email,
            uid,
            createdAt: new Date().toISOString()
        }
        const dbRef = ref(getDatabase());
        await set(child(dbRef, `users/${uid}`), userData);
        return userData;
    }
    extractErrorDetails = (errorMessage: string) => {
        const matchResult = errorMessage.match(/^(.*?):\s(.*?)\s\((.*?)\)\.$/);
        if (matchResult) {
            const [, , errorType, errorMessageText] = matchResult;
            const formattedErrorMessageText = errorMessageText.replace('auth/', '');
            return `${errorType} ${formattedErrorMessageText}`;
        }
        return 'error';
    }
    handleOnSubmit = async () => {
        if (this.formState === 'login') {
            await this.login();
        } else {
            await this.register();
        }
    }
    handleKeyboardDidShow = () => {
        this.setKeyboardShown(true);
    }
    handleKeyboardDidHide = () => {
        this.setKeyboardShown(false);
    }
    toggleLoading = () => {
        this.setIsLoading((prevIsLoading) => !prevIsLoading);
    }

    getUserData = async (uid: string) => {
        const dbRef = ref(getDatabase());
        const userSnapshot = await get(child(dbRef, `users/${uid}`));
        if (userSnapshot.exists()) {
            console.log('X',userSnapshot.val());
            
            // return userSnapshot.val();
        } else {
            throw new Error('User data not found');
        }
    };
    

}