import { View, Text, Button, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../styles";
import { getBackgroundColorStyle } from "../utils";

interface ButtonProps {
    label: string;
    onPress: () => void;
    backgroundColor: 'bgAlert' | 'bgPrimary' | 'bgSecondary' | 'bgSuccess' | 'bgWarning' | 'bgDark' | 'bgLight';
    disabled?: boolean;
}
export default function SubmitButton({ label, onPress, backgroundColor, disabled = false }: ButtonProps) {

    return (
        <Pressable disabled={disabled}  onPress={onPress} style={({ pressed }) => [styles.submitButton, getBackgroundColorStyle(backgroundColor,disabled), { opacity: pressed ? 0.6 : 1 }]}>
            <Text style={styles.submitButtonLabel}>{label}</Text>
        </Pressable>
    );
}


