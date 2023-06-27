import React, { useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useStoreActions, useStoreState, useStoreDispatch } from '../state/hooks';
import PageTitle from "../components/page-title";
import PageContainer from "../components/page-container";
import ThematicBreak from "../components/thematic-break";
import { Input } from "../components/input";
import SubmitButton from "../components/submit-button";
import ImageProfile from "../components/image-profile";
import * as ImagePicker from 'expo-image-picker';
import firebaseUtils from "../utils/firebase-utils";

export default function SettingsScreen() {
    const {logout, updateSettingsForm, updateSignedInAuthUserDataAsync} = useStoreActions((actions) => actions);
    const {settingsForm, auth, hasSettingFormChanged} = useStoreState((state) => state);
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null | undefined>(auth.user.profileImage || null);
    const handleFormSubmit = () => {
        const payload = {
            firstName: settingsForm.firstName,
            lastName: settingsForm.lastName,
            email: settingsForm.email,
            fullName: `${settingsForm.firstName} ${settingsForm.lastName}`,
            uid: auth.user.uid,
        }
        updateSignedInAuthUserDataAsync(payload);
    }
    const handleImageUpload = async () => {
        setIsLoading(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
    
          if (!result.canceled) {
            const uploadResult = await firebaseUtils.uploadImageAsync(result.assets[0].uri);

            setProfileImage(uploadResult);
            const payload = {
              ...auth.user,
              profileImage: uploadResult,
            }
    
            await updateSignedInAuthUserDataAsync(payload);
            setIsLoading(false);
    
            
          }
          
    };
    return (
        <PageContainer>
            <PageTitle title="Settings" textAlignment="flex-start" />
            <ScrollView>
            <ThematicBreak />
            <ImageProfile isLoading={isLoading} profileImage={profileImage} name={auth.user.fullName} description="" handleImageUpload={handleImageUpload} />
            <ThematicBreak />
            <View>
                <Input inputMode="none" icon="person" color="white" placeholder={auth.user.firstName} initialValue={auth.user.firstName}  onChangeText={(value) => updateSettingsForm({ firstName: value })} />
                <Input inputMode="none" icon="person" color="white" placeholder={auth.user.lastName} initialValue={auth.user.lastName} onChangeText={(value) => updateSettingsForm({lastName:value})} />
                <Input inputMode="email" icon="email" color="white" placeholder={auth.user.email} initialValue={auth.user.email} onChangeText={(value) => updateSettingsForm({email:value})} />
                <Input inputMode="none" icon="person" color="white" placeholder="Bio" value={settingsForm.bio} onChangeText={(value) => updateSettingsForm({bio:value})} />
                <SubmitButton label="Update" onPress={() => {
                    handleFormSubmit();
                    
                 }} 
                backgroundColor="bgPrimary" disabled={!hasSettingFormChanged}
                 />
            </View>
            <Button title="Logout" onPress={() => {
                logout();
            }} />
            </ScrollView>
        </PageContainer>
    );
}