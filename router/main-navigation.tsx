import { createStackNavigator } from "@react-navigation/stack";
import HomeTabs from "../components/home-tabs";
import ChatListScreen from "../screens/chat";
import { RootStackParamList } from "../types/navigator";



const Stack = createStackNavigator<RootStackParamList>();

export default function MainNavigation() {
    return (
        <Stack.Navigator >
        <Stack.Screen name="Home" component={HomeTabs} options={{
            headerShown: false,
        }} />
        <Stack.Screen name="Chat" component={ChatListScreen} options={{
            headerBackTitle: "Back",
        }} />
    </Stack.Navigator>
    )
}