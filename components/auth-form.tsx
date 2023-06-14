import React from "react";
import { Button, KeyboardAvoidingView, Platform, View, Image } from "react-native";
import { styles } from "../styles";
import { Input } from "./input";
import SubmitButton from "./submit-button";
import { Asset } from "expo-asset";
import { Form } from "../types/form";
import { AuthUI } from "../utils";
const logo = Asset.fromModule(require('../assets/images/logo.png')).uri;


interface AuthFormProps {
    keyboardShown: boolean;
    formState: string;
    form: Form;
    authUI: AuthUI;
}

export default function AuthForm({ keyboardShown, formState, form, authUI }: AuthFormProps) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100} style={styles.flex1}>
            <View style={[styles.logoContainer, { flex: keyboardShown ? 0.5 : 1 }]}>
                <Image source={{ uri: logo }} style={[styles.logo]} />
            </View>
            {formState === 'register' && (
                <>
                    <Input inputMode="none" icon="person" color="white" placeholder="First Name" value={form.firstName} onChangeText={(value) => authUI.handleOnChangeText('firstName', value)} />
                    <Input inputMode="none" icon="person" color="white" placeholder="Last Name" value={form.lastName} onChangeText={(value) => authUI.handleOnChangeText('lastName', value)} />
                </>
            )}
            <Input inputMode="email" icon="email" color="white" placeholder="Email" value={form.email} onChangeText={(value) => authUI.handleOnChangeText('email', value)} />
            <Input icon="password" color="white" placeholder="Password" secureTextEntry={true} value={form.password} onChangeText={(value) => authUI.handleOnChangeText('password', value)} />
            <SubmitButton label={formState === 'login' ? 'Login' : 'Register'} onPress={() => { console.log('hello') }} backgroundColor="bgPrimary" disabled={!authUI.isFormFilled()} />
            <View style={[styles.row, styles.xEnd, styles.verticalMargin]}>
                <Button title={formState === 'login' ? 'Register' : 'Login'} onPress={authUI.toggleFormState} />
            </View>
        </KeyboardAvoidingView>
    )
}