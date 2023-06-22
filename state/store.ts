import { createStore, action, Action, Thunk, thunk, Computed, computed } from 'easy-peasy';
import firebaseUtils from '../utils/firebase-utils';
import { FirebaseError } from '@firebase/util';
import { extractErrorDetails } from '../utils/strings';
import { StoreModel, StateModel, ActionsModel } from '../types/store-model';
import { AsyncStorageHandler } from '../utils/local-storage';
import InputValidator from '../utils/input-validator';

const authOriginalState = {
    token: '',
    user: {
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        uid: '',
        createdAt: '',
    }
};
const stateModel: StateModel = {
    isLoading: false,
    errorMessage: null,
    chats: [],
    user: null,
    auth: authOriginalState,
    settingsForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
    },
    hasSettingFormChanged: computed(
        (state) => {
            const { email } = state.auth.user;
            const { email: emailForm } = state.settingsForm;
            const isEmailFormValid = InputValidator.validateEmail(emailForm);
            const hasChanged = Boolean(emailForm && email !== emailForm && isEmailFormValid);


            return hasChanged;
        }
      ),
};

const actionModel: ActionsModel = {
    updateSettingsForm: action((state, payload) => {
        state.settingsForm = { ...state.settingsForm, ...payload };
    }),
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
        state.auth = authOriginalState;
        AsyncStorageHandler.remove('userAuthData');
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
        actions.toggleLoading();
        try {
            const result = await firebaseUtils.signInWithEmailAndPassword(email, password);  
            const { uid,stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;
            const expiryDate = new Date(expirationTime * 1000);
            const userData = await firebaseUtils.getUserData(uid);
            if (userData) {
                actions.setAuth({ token: accessToken, user: userData });
                const data = { accessToken, uid, expiryDate };
                await AsyncStorageHandler.set('userAuthData', data);
                actions.toggleLoading();
            }

        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                const errorMessage = extractErrorDetails(error.message);
                actions.updateErrorMessage(errorMessage);
            }
            actions.toggleLoading();
        }
    }
    ),
    logout: thunk(async (actions) => {
        try {
            // await firebaseUtils.signOut(); explore this
            actions.clearUser();
            await AsyncStorageHandler.remove('userAuthData');
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

            const { uid, stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;
            const expiryDate = new Date(expirationTime * 1000);
            const user = await firebaseUtils.createUserData(uid, firstName, lastName, email);
            actions.setAuth({ token: accessToken, user });
            const data = { accessToken, uid, expiryDate };
            await AsyncStorageHandler.set('userAuthData', data);
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
