import { StyleProp, ViewStyle, View } from "react-native";
import { styles } from "../styles";

export default function PageContainer({ children, style }: { children: React.ReactNode, style?: StyleProp<ViewStyle> }) {
    return (
        <View style={[styles.pageContainer, style]}>
            {children}
        </View>
    );
}