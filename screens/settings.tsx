import React from "react";
import { View, Text, Button } from "react-native";
import { useStoreActions, useStoreState } from '../state/hooks';
import PageTitle from "../components/page-title";
import PageContainer from "../components/page-container";
import ThematicBreak from "../components/thematic-break";
import { Input } from "../components/input";
import SubmitButton from "../components/submit-button";

export default function SettingsScreen() {
    const {clearUser, updateSettingsForm} = useStoreActions((actions) => actions);
    const {settingsForm, auth} = useStoreState((state) => state);

    return (
        <PageContainer>
            <PageTitle title="Settings" textAlignment="flex-start" />
            <ThematicBreak />
            <View>
                <Input inputMode="none" icon="person" color="white" placeholder={auth.user.firstName} value={settingsForm.firstName} onChangeText={(value) => updateSettingsForm({ firstName: value })} />
                <Input inputMode="none" icon="person" color="white" placeholder={auth.user.lastName} value={settingsForm.lastName} onChangeText={(value) => updateSettingsForm({lastName:value})} />
                <Input inputMode="email" icon="email" color="white" placeholder={auth.user.email} value={settingsForm.email} onChangeText={(value) => updateSettingsForm({email:value})} />
                <Input inputMode="none" icon="person" color="white" placeholder="Bio" value={settingsForm.bio} onChangeText={(value) => updateSettingsForm({bio:value})} />
                <SubmitButton label="Update" onPress={() => {
                    console.log('settingsForm', settingsForm);
                    
                 }} 
                backgroundColor="bgPrimary" disabled={false}
                 />
            </View>
            <Button title="Logout" onPress={() => {
                clearUser();
            }} />
        </PageContainer>
    );
}