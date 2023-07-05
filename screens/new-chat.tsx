import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { HomeScreenProps } from "../types/navigator";
import ChatListHeaderRight from "../components/chat-list-header-right";
import { colors, styles } from "../styles/index";
import { Input } from "../components/input";
import { User } from "firebase/auth";
import { FontAwesome } from '@expo/vector-icons';
import firebaseUtils from "../utils/firebase-utils";

export default function NewChatScreen({ navigation }: HomeScreenProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usersData, setUsersData] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ChatListHeaderRight title="Close" iconName="close" color={colors.primary} handlePress={handlePress} />
      ),
      headerTitle: "New Chat",
    });
  }, []);

  useEffect(() => {
    let debounce: NodeJS.Timeout | null = null;

    if (searchQuery && searchQuery !== "") {
      setLoading(true);
      setUsersData([]);

      debounce = setTimeout(async () => {
        try {
          const userResults = await firebaseUtils.searchUsersAsync(searchQuery) as unknown as User[];
          setUsersData(userResults);
        } catch (error) {
          setError("Error occurred while searching for users.");
        } finally {
          setLoading(false);
        }
      }, 500);
    }

    return () => {
      if (debounce) {
        clearTimeout(debounce);
        debounce = null;
      }
    };
  }, [searchQuery]);

  const handlePress = () => {
    navigation.goBack();
  };

  const handleOnChangeText = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={[styles.pageTableContainer]}>
      <Input iconBgColor={colors.transparent} smartIcon={{ enabled: true, name: "search-outline" }} color={colors.primary} placeholder="Search User" onChangeText={handleOnChangeText} />

      {loading && (
        <View style={[styles.flex1, styles.xCenter, styles.yCenter]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      {!loading && !searchQuery && <NoResults />}

      {usersData.length > 0 && searchQuery !== "" && usersData.map((user) => (
  <View key={user.uid}>
    <Text>{user.uid}</Text>
  </View>
))}
    </View>
  );
}

const NoResults = () => {
  return (
    <View style={[styles.flex1, styles.xCenter, styles.yCenter]}>
      <FontAwesome name="users" size={54} color={colors.gray} />
      <Text style={[{ color: colors.gray }]}>Search for user!</Text>
    </View>
  );
}