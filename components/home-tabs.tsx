import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/home";
import SettingsScreen from "../screens/settings";
import { RootTabParamList } from "../types/navigator";
import { Ionicons } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator<RootTabParamList>();
export default function HomeTabs () {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeTabs" component={HomeScreen} options={{
                headerShown: false,
                tabBarLabel: "Chats",
                tabBarIcon: ({ color, size }) => (<Ionicons name="chatbubble-outline" size={size} color={color} /> ),
            }} />
            <Tab.Screen name="Settings" component={SettingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="settings-outline" size={size} color={color} />),
                }}
             />
        </Tab.Navigator>
    );
}