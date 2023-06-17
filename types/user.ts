
export interface User {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    uid: string;
    createdAt: string;
}

export interface UserCredentials { user: { uid: string, stsTokenManager:{accessToken: string, expirationTime: number, refreshToken: string} } };

export interface UserAuthData {accessToken:string,uid:string,expiryDate:Date};