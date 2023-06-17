import { Action, Thunk } from 'easy-peasy';
import { User } from './user';

export interface StateModel {
    isLoading: boolean;
    errorMessage: string | null;
    chats: any[];
    auth: {
        token: string;
        user: User
    }
    user: User | null;
}

export interface ActionsModel {
    setAuth: Action<StateModel, {
        token: string;
        user: User;
    }>;
    setUser: Action<StateModel, {
      firstName: string;
      lastName: string;
      fullName: string;
      email: string;
      uid: string;
        createdAt: string;
    }>;
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

export interface StoreModel extends StateModel, ActionsModel {};