import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../styles";
import { getBackgroundColorStyle } from "../utils";

interface ButtonProps {
    label: string;
    onPress: () => void;
    backgroundColor: 'bgAlert' | 'bgPrimary' | 'bgSecondary' | 'bgSuccess' | 'bgWarning' | 'bgDark' | 'bgLight';
}
export default function SubmitButton({ label, onPress, backgroundColor }: ButtonProps) {

    return (
        <TouchableOpacity onPress={onPress} style={[ styles.submitButton, getBackgroundColorStyle('bgPrimary')]}>
            <Text style={styles.submitButtonLabel}>{label}</Text>
        </TouchableOpacity>
    );
}


