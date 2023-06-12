import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import { RouteProp } from '@react-navigation/native';
export type RootStackParamList = {
    Home: undefined;
    Chat: undefined;
  };
  
  type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
  type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, "Chat">;
  
  export type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
  };
  
  export type ChatScreenProps = {
    navigation: ChatScreenNavigationProp;
  };

  export type RootTabParamList = {
    HomeTabs: undefined;
    Settings: undefined;
    };


  type HomeScreenTabNavigationProp = BottomTabNavigationProp<RootTabParamList, "HomeTabs">;
    type SettingsScreenTabNavigationProp = BottomTabNavigationProp<RootTabParamList, "Settings">;

    export type HomeScreenTabProps = {
    navigation: HomeScreenTabNavigationProp;
    };

    export type SettingsScreenTabProps = {
    navigation: SettingsScreenTabNavigationProp;
    };