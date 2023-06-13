import { Feather, Ionicons } from "@expo/vector-icons"
import { View, TouchableOpacity, TextInput } from "react-native"
import { styles } from "../styles"
import { ChatUI } from "../utils";

interface ChatFooterProps {
    message: string;
    handleSendMesssage: () => void;
    chatUI: ChatUI;
}

export default function ChatFooter({ message, handleSendMesssage, chatUI }: ChatFooterProps) {
    return (
        <View style={[styles.row, styles.chatFooterBar, styles.spread]}>
                    <TouchableOpacity onPress={() => { console.log('pressed') }} style={[styles.xCenter, styles.yCenter]}>
                        <Feather name="plus" size={24} style={styles.colorAlert} />
                    </TouchableOpacity>
                    <TextInput
                        value={message}
                        onChangeText={chatUI.textfieldChange}
                        placeholder="Type a message" style={[styles.flex1, styles.chatFooterTextBox]}
                        onSubmitEditing={handleSendMesssage}
                    />
                    {
                        chatUI.isTextfieldEmpty() ? (
                            <TouchableOpacity onPress={() => { console.log('pressed') }} style={styles.chatFooterInactiveButton}>
                                <Feather name="camera" size={24} style={styles.colorAlert} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleSendMesssage} style={styles.chatFooterActiveButton}>
                                <Ionicons name="send" size={24} style={styles.colorWhite} />
                            </TouchableOpacity>
                        )
                    }
                </View>
    )
}