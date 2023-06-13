import { styles } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../components/input";
import { useState } from "react";
import SubmitButton from "../components/submit-button";

export default function AuthScreen() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const handleOnChangeText = (key: string, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [key]: value }))
    }
    return (
        <SafeAreaView style={[styles.column, styles.flex1, styles.horizontalMargin, styles.verticalMargin]}>
            <Input icon="person" color="white" placeholder="First Name" value={form.firstName} onChangeText={(value) => handleOnChangeText('firstName', value)} />
            <Input icon="person" color="white" placeholder="Last Name" value={form.firstName} onChangeText={(value) => handleOnChangeText('lastName', value)} />
            <Input icon="email" color="white" placeholder="Email" value={form.email} onChangeText={(value) => handleOnChangeText('email', value)} />
            <Input icon="password" color="white" placeholder="Password" secureTextEntry={true} value={form.password} onChangeText={(value) => handleOnChangeText('password', value)} />
            <SubmitButton label="Submit" onPress={() => {}} backgroundColor="bgSuccess" />
        </SafeAreaView>
    )
}



