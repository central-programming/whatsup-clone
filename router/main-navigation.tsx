import { createStackNavigator } from "@react-navigation/stack";
import HomeTabs from "../components/home-tabs";
import ChatScreen from "../screens/chat";
import NewChatScreen from "../screens/new-chat";
import { RootStackParamList } from "../types/navigator";



const Stack = createStackNavigator<RootStackParamList>();

export default function MainNavigation() {
    return (
        <Stack.Navigator screenOptions={{ animationEnabled: false, animationTypeForReplace: "push" }} >
            <Stack.Group  >
                <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeTabs}  />
                <Stack.Screen name="Chat" component={ChatScreen} options={{ headerBackTitle: "Back" }} />   
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }} >
                    <Stack.Screen name="NewChat" component={NewChatScreen} options={{ headerLeftContainerStyle: { paddingHorizontal: 15 }}} />
                </Stack.Group>
        </Stack.Navigator>
    )
}

