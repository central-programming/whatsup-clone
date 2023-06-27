
export interface User {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    uid: string;
    createdAt?: string;
    profileImage?: string | null | undefined;
    confirmPassword?: string;
    password?: string;
    bio?: string;
}

export interface FirebaseUserCredentials { user: { uid: string, stsTokenManager: { accessToken: string, expirationTime: number, refreshToken: string } } };

export interface UserAuthData { accessToken: string, uid: string, expiryDate: Date };

export interface Auth {
    token: string,
    user: User
}