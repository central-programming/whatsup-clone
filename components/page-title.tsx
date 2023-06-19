import { View , Text} from "react-native";
import { styles } from "../styles";


export default function PageTitle({ title, textAlignment }: { title: string, textAlignment: 'flex-start' | 'center' | 'flex-end' }) {
    return (
        <View style={[styles.pageTitleContainer, {alignItems:textAlignment}]} >
            <Text style={styles.pageTitle}>{title}</Text>
        </View>
    );
}
