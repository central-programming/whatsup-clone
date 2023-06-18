import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseApp } from '@firebase/app';
import firebaseApp from "./firebase-config";
import { UserCredentials, UserAuthData, Auth, User } from "../types/user";




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
        return result;
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
}

const firebaseUtils = new FirebaseUtils();
export default firebaseUtils;