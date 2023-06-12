import { StackNavigationProp } from "@react-navigation/stack";

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
  