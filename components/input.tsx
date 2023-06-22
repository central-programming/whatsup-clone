import { View, TextInput, Text } from "react-native";
import { styles } from "../styles";
import { selectedIcon } from "../utils";
import { useState } from "react";


interface InputProps {
    label?: string;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    icon: string;
    color: string;
    inputMode?: "text" | "numeric" | "decimal" | "email" | "search" | "tel" | "url" | "none";
    initialValue?: string;
}
export function Input({ icon, color, placeholder, secureTextEntry = false, value, onChangeText, inputMode = 'none', initialValue }: InputProps) {
    const [inputValue, setInputValue] = useState<string>(initialValue || '');
    const handleOnChangeText = (text: string) => {
        if (onChangeText) {
            setInputValue(text);
            onChangeText(text);
        }
    }
    return (
        <View style={[styles.input]}>
            <Text style={styles.inputLabel}>
                {selectedIcon(icon, color)}
            </Text>
            <TextInput 
                inputMode={inputMode} 
                value={inputValue}
                onChangeText={handleOnChangeText} 
                style={styles.inputText} 
                placeholder={placeholder} 
                secureTextEntry={secureTextEntry}
                autoCapitalize={inputMode === 'email' ? 'none' : 'sentences'}
            />
        </View>
    )
}