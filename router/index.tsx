import React from "react";
import MainScreen from "../screens/main";
import { StoreProvider } from 'easy-peasy';
import store from '..//state/store';

export default function Router() {
    return (
        <StoreProvider store={store}>
            <MainScreen />
        </StoreProvider>
    );
}
