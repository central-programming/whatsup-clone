import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatListScreen from "../screens/chat-list";
import SettingsScreen from "../screens/settings";
import { RootTabParamList } from "../types/navigator";
import { Ionicons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator<RootTabParamList>();
export default function HomeTabs () {
    return (
        <Tab.Navigator 
        screenOptions={{
            headerShown: false, // Hide the header
            
          }}
        >
            <Tab.Screen name="ChatList" component={ChatListScreen} options={{
                headerTitle: "Chats",
                headerShadowVisible: false,
                headerShown: true,
                tabBarLabel: "Chats",
                tabBarIcon: ({ color, size }) => (<Ionicons name="chatbubble-outline" size={size} color={color} /> ),
            }} />
            <Tab.Screen name="Settings" component={SettingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (<Ionicons name="settings-outline" size={size} color={color} />),
                    headerShown: false,
                }}
             />
        </Tab.Navigator>
    );
}