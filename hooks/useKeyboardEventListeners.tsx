import { useEffect } from "react";
import { Keyboard, KeyboardEventListener, KeyboardEvent } from "react-native";

export default function useKeyboardEventListeners(
    onKeyboardDidShow: (event: KeyboardEvent) => void,
    onKeyboardDidHide: (event: KeyboardEvent) => void
) {
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow as unknown as KeyboardEventListener);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide as unknown as KeyboardEventListener);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    },[
        onKeyboardDidHide,
        onKeyboardDidShow
    ]);
    
}