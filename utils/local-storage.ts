import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserAuthData } from '../types/user';


type LocalStorageKeys = 'userAuthData';

export class AsyncStorageHandler {
  static async set(key:LocalStorageKeys, value:UserAuthData) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify({
        accessToken: value.accessToken,
        uid: value.uid,
        expiryDate: value.expiryDate.toISOString()
      }));
    } catch (error) {
      console.log('Error storing data:', error);
    }
  }

  static async get(key:LocalStorageKeys):Promise<UserAuthData | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log('Error retrieving data:', error);
      return null;
    }
  }

  static async remove(key:LocalStorageKeys) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing data:', error);
    }
  }
}
