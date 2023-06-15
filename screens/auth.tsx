import React, { useState } from "react";
import { styles } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import useKeyboardEventListeners from "../hooks/useKeyboardEventListeners";
import { AuthUI } from "../utils";
import AuthForm from "../components/auth-form";





export default function AuthScreen() {
    const [keyboardShown, setKeyboardShown] = useState(false);
    const [formState, setFormState] = useState('login');
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', errorMessage: '' });
    const [isLoading, setIsLoading] = useState(false);
    const authUI = new AuthUI(formState, form, setFormState, setKeyboardShown, setForm, isLoading, setIsLoading);

    useKeyboardEventListeners(authUI.handleKeyboardDidShow, authUI.handleKeyboardDidHide);

    return (
        <SafeAreaView style={[styles.column, styles.flex1, styles.horizontalMargin, styles.verticalMargin]}>
            <AuthForm keyboardShown={keyboardShown} formState={formState} form={form} authUI={authUI} />
        </SafeAreaView>
    );

}