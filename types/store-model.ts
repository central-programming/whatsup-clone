import { Action, Computed, Thunk } from 'easy-peasy';
import { Auth, User } from './user';

export interface StateModel {
    isLoading: boolean;
    errorMessage: string | null;
    chats: any[];
    auth: Auth;
    user: User | null;
    settingsForm: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
        bio: string;
    };
    hasSettingFormChanged: Computed<StateModel, boolean>;
}

export interface ActionsModel {
    updateSignedInAuthUserData: Action<StateModel, {
        firstName: string;
        lastName: string;
        fullName: string;
        email: string;
    }>;
    updateSignedInAuthUserDataAsync: Thunk<ActionsModel, User>;
    updateSettingsForm: Action<StateModel, {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        bio?: string;
    }>;
    setAuth: Action<StateModel, Auth>;
    setUser: Action<StateModel, User>;
    toggleLoading: Action<StateModel>;
    clearUser: Action<StateModel>;
    setErrorMessage: Action<StateModel, string | null>;
    updateErrorMessage: Thunk<ActionsModel, string>;
    login: Thunk<ActionsModel, { email: string; password: string }>;
    logout: Thunk<ActionsModel>;
    register: Thunk<ActionsModel, {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }>;
}

export interface StoreModel extends StateModel, ActionsModel { };