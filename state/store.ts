import { createStore, action, Action, Thunk, thunk } from 'easy-peasy';
import firebaseUtils from '../utils/firebase-utils';
import { FirebaseError } from '@firebase/util';
import { extractErrorDetails } from '../utils/strings';
import { StoreModel, StateModel, ActionsModel } from '../types/store-model';
import localStorage from '../utils/local-storage';


const stateModel: StateModel = {
    isLoading: false,
    errorMessage: null,
    chats: [],
    user: null,
    auth: {
        token: '',
        user: {
            firstName: '',
            lastName: '',
            fullName: '',
            email: '',
            uid: '',
            createdAt: '',
        }
    }
};

const actionModel: ActionsModel = {
    setUser: action((state, payload) => {
        state.user = payload;
    }),
    setAuth: action((state, payload) => {
        state.auth = payload;
    }),
    toggleLoading: action((state) => {
        state.isLoading = !state.isLoading;
    }),
    clearUser: action((state) => {
        state.user = null;
    }),
    setErrorMessage: action((state, payload) => {
        state.errorMessage = payload;
    }),
    updateErrorMessage: thunk(async (actions, payload) => {
        actions.setErrorMessage(payload);
        setTimeout(() => {
            actions.setErrorMessage(null);
        }, 5000);

    }),

    login: thunk(async (actions, payload) => {
        const { email, password } = payload;
        try {
            const result = await firebaseUtils.signInWithEmailAndPassword(email, password);
            const { uid } = result.user;
            const user = await firebaseUtils.getUserData(uid);
            actions.setUser(user);
            console.log('logged in user:', user);

        } catch (error: any) {
            console.log(error.code);
        }
    }
    ),
    logout: thunk(async (actions) => {
        try {
            await firebaseUtils.signOut();
            actions.clearUser();
        }
        catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.log(error.code);
            }
        }
    }
    ),
    register: thunk(async (actions, payload) => {
        const { firstName, lastName, email, password } = payload;
        actions.toggleLoading();
        try {
            const result = await firebaseUtils.createUserWithEmailAndPassword(email, password);
            console.log('result:', result.user.stsTokenManager);
            
            const { uid, stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;
            const expiryDate = new Date(expirationTime * 1000);
            const user = await firebaseUtils.createUserData(uid, firstName, lastName, email);
            actions.setAuth({token: accessToken, user});
            
            localStorage.set('token',{accessToken,  uid, expiryDate});
            // actions.setUser(user);
            // console.log('registered user:', user);
            actions.toggleLoading();
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                const errorMessage = extractErrorDetails(error.message);
                actions.updateErrorMessage(errorMessage);

                actions.toggleLoading();
                console.log(error.code);
            }
        }
    }
    ),

};


const storeModel: StoreModel = {
    ...stateModel,
    ...actionModel,
};
const store = createStore(storeModel);

export default store;
