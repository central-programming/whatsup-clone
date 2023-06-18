import { useStoreState, useStoreActions } from "../state/hooks";
import React, { useEffect, useState } from "react";
import firebaseUtils from "../utils/firebase-utils";
import { AsyncStorageHandler } from "../utils/local-storage";

const useRefreshTokenCheck = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const { token } = useStoreState((state) => state.auth);
    const { setAuth } = useStoreActions((actions) => actions);

    useEffect(() => {
        const checkRefreshToken = async () => {
            const userData = await AsyncStorageHandler.get('userAuthData');

            if (!userData) {
                setIsLoading(false);
                return;
            }
            const { accessToken, uid, expiryDate } = userData;
            const expirationDate = new Date(expiryDate);
            if (expirationDate <= new Date() || !accessToken || !uid) {
                setIsLoading(false);
                return;
            }
            const user = await firebaseUtils.getUserData(uid);
            if (!user) {
                setIsLoading(false);
                return;
            }
            await setAuth({ token: accessToken, user });

            setIsLoading(false);
            setTokenIsValid(true);
        };

        checkRefreshToken();
    }, [setAuth]);

    return { isLoading, tokenIsValid };
};

export default useRefreshTokenCheck;