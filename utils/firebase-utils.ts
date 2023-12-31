import { getDatabase, ref, onValue, set, child, get, update, orderByChild, endAt, startAt, query } from "firebase/database";
// import { collection,  where, doc, onSnapshot, setDoc, deleteDoc, serverTimestamp, orderBy, limit, DocumentData, getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref as strgRef, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FirebaseApp } from '@firebase/app';
import firebaseApp from "./firebase-config";
import { FirebaseUserCredentials, UserAuthData, Auth, User } from "../types/user";
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
        await update(child(dbRef, `users/${uid}`), userData);
        const userSnapshot = await get(child(dbRef, `users/${uid}`));
        const updatedUserVal = userSnapshot.val();
        return updatedUserVal;

    }

    signOut = async () => {
        const auth = getAuth(this.app);
        await auth.signOut();
    }

    createUserWithEmailAndPassword = async (email: string, password: string) => {
        const auth = getAuth(this.app);
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result as unknown as FirebaseUserCredentials;
    }

    signInWithEmailAndPassword = async (email: string, password: string) => {
        const auth = getAuth(this.app);
        const result = await signInWithEmailAndPassword(auth, email, password);

        return result as unknown as FirebaseUserCredentials;
    }

    createUserData = async (uid: string, firstName: string, lastName: string, email: string) => {
        const fullName = `${firstName} ${lastName}`.toLocaleLowerCase();
        const userData: User = {
            firstName,
            lastName,
            fullName,
            email,
            uid,
            createdAt: new Date().toISOString(),
        }
        const dbRef = ref(getDatabase());
        await set(child(dbRef, `users/${uid}`), userData);
        return userData;
    }

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

    searchUsersAsync = async (queryText: string) => {
        try {
          const searchQuery = queryText.toLowerCase();
          const dbRef = ref(getDatabase());
          const userRef = child(dbRef, 'users');
          const queryRef = query(userRef, orderByChild('fullName'));
      
          const snapshot = await get(queryRef);
      
          if (snapshot.exists()) {
            const users = snapshot.val() as User[];
            
            const usersArray = Object.values(users);
            const matchingUsers = usersArray.filter((user: User) =>
              user.fullName.toLowerCase().includes(searchQuery)
            );  
            return matchingUsers as unknown as User[];
          }
      
          return [];
        } catch (error) {
          console.log(error);
          return [];
        }
      };
      
}

const firebaseUtils = new FirebaseUtils();
export default firebaseUtils;
