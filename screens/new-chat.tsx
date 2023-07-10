import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, TouchableWithoutFeedback } from "react-native";
import { HomeScreenProps } from "../types/navigator";
import ChatListHeaderRight from "../components/chat-list-header-right";
import { colors, styles } from "../styles/index";
import { Input } from "../components/input";

import { FontAwesome } from '@expo/vector-icons';
import firebaseUtils from "../utils/firebase-utils";
import { FlatList } from "react-native-gesture-handler";
import { User } from "../types/user";
import { useStoreState } from "../state/hooks";
import { Entypo } from '@expo/vector-icons'; 
import DataItem from "../components/data-item";


export default function NewChatScreen({ navigation }: HomeScreenProps) {
    const currentUser = useStoreState((state) => state.auth.user)
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
                    const filteredResults = userResults.filter((u) => u.uid !== currentUser.uid)



                    setUsersData(filteredResults);
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
            {
                usersData.length > 0 && searchQuery !== '' && (
                    <FlatList
                        data={usersData}
                        keyExtractor={(user) => user.uid}
                        renderItem={({ item }) => {





                            return (
                                <DataItem {...item} />
                            )
                        }}
                    />
                )
            }
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

