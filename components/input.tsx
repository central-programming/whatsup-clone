import { View, TextInput, Text } from "react-native";
import { styles } from "../styles";
import { selectedIcon } from "../utils";


interface InputProps {
    label?: string;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    icon: string;
    color: string;
}
export function Input({ icon, color, placeholder, secureTextEntry = false, value, onChangeText }: InputProps) {

    return (
        <View style={[styles.input]}>
            <Text style={styles.inputLabel}>
                {selectedIcon(icon, color)}
            </Text>
            <TextInput value={value} onChangeText={onChangeText} style={styles.inputText} placeholder={placeholder} secureTextEntry={secureTextEntry} />
        </View>
    )
}