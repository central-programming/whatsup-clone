import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserAuthData } from '../types/user';

const localStorage = {
    set: async (key: string,data:UserAuthData) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    },
    get: async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value) as UserAuthData;
            }
        } catch (e) {
            console.log(e);
        }
    },
    remove: async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.log(e);
        }
    }
};

export default localStorage;


//keys
interface LocalStorageKeys {
    userAuthData: string;
}