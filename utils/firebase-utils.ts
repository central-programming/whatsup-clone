import { getDatabase, ref, set, child, get, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref as strgRef, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FirebaseApp } from '@firebase/app';
import firebaseApp from "./firebase-config";
import { UserCredentials, UserAuthData, Auth, User } from "../types/user";
import uuid from 'react-native-uuid';




class FirebaseUtils {
    app: FirebaseApp;
    constructor() {
        this.app = firebaseApp();
    }// add 
    getUserData = async (uid: string): Promise<User | null> => {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `users/${uid}`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    }

    updateUserData = async (uid: string, userData: Partial<User>) => {
        const dbRef = ref(getDatabase());
        // await set(child(dbRef, `users/${uid}`), userData);
        const updatedUserVal = await update(child(dbRef, `users/${uid}`), userData);

    }

    signOut = async () => {
        const auth = getAuth(this.app);
        await auth.signOut();
    }

    createUserWithEmailAndPassword = async (email: string, password: string) => {
        const auth = getAuth(this.app);
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result as unknown as UserCredentials;
    }

    signInWithEmailAndPassword = async (email: string, password: string) => {
        const auth = getAuth(this.app);
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log('result', result);
        
        return result as unknown as UserCredentials;
    }

    createUserData = async (uid: string, firstName: string, lastName: string, email: string) => {
        const fullName = `${firstName} ${lastName}`.toLocaleLowerCase();
        const userData = {
            firstName,
            lastName,
            fullName,
            email,
            uid,
            createdAt: new Date().toISOString()
        }
        const dbRef = ref(getDatabase());
        await set(child(dbRef, `users/${uid}`), userData);
        return userData;
    }

  /*   uploadImageAsync = async (uri: string) => {
        try {
            const blob = new Promise((resolve, reject) => { // blob is a file-like object that contains raw data
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response)
                }
                xhr.onerror = function (e) {
                    console.log(e);
    
                    reject(new TypeError('Network Reques failed'))
                }
                xhr.responseType = 'blob'
                xhr.open('GET', uri, true)
                xhr.send(null)
    
            });
            const pathFolder = 'profilePictures';
            const storageRef = strgRef(getStorage(this.app), `${pathFolder}/${uuid.v4()}`);
            await uploadBytesResumable(storageRef, blob as unknown as Blob);
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.log(error);
            return null;
            
        }
    } */
    uploadImageAsync = async (uri: string) => {
        try {
          const storage = getStorage(this.app);
          const auth = getAuth(this.app);
    
          const response = await fetch(uri);
          const blob = await response.blob();
          
          const pathFolder = 'profilePictures';
          const storageRef = strgRef(storage, `${pathFolder}/${uuid.v4()}`);
          await uploadBytesResumable(storageRef, blob);
          const downloadURL = await getDownloadURL(storageRef);
    
          return downloadURL;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
}

const firebaseUtils = new FirebaseUtils();
export default firebaseUtils;
