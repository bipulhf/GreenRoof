export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    score: number;
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

export interface Content {
    contentList: Question[];
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
