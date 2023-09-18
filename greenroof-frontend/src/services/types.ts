export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    score: number;
    profilePhoto: string;
    city: string;
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

export interface Content<T> {
    contentList: T[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export interface Answer {
    id: number;
    answerText: string;
    answerer: User;
    score: number;
    createdAt: Date;
}

export interface Question {
    id: number;
    questionTitle: string;
    questionText: string;
    questioner: User;
    createdAt: Date;
}

export interface ValidationError {
    message: string;
    response: {
        data: {
            message: string;
        };
    };
}

export interface Post {
    id: number;
    postText: string;
    postAttatchments: string;
    createdAt: Date;
    priorityValue: number;
    user: User;
}

export interface Comment {
    id: number;
    commentText: string;
    createdAt: Date;
    commenter: User;
}

export interface Follower {
    id: number;
    follower: User;
}
export interface Following {
    id: number;
    following: User;
}
export interface AuthObject {
    name: string;
    accessToken: string;
}
