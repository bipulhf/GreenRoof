export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profilePhoto: string;
}
export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profilePhoto: string;
    city: string;
    createdAt: Date;
}
