export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    score: number;
    profilePhoto: string;
    city: string;
    role: string;
    isBanned: boolean;
    createdAt: Date;
}

export interface Notif {
    id: number;
    content: string;
    notificationType: string;
    delivered: boolean;
    read: false;
    userFrom: User;
    communityPost: Post;
    createdAt: Date;
}

export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    score: number;
    email?: string;
    profilePhoto: string;
    city: string;
    role: string;
    isBanned: boolean;
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

export interface Tag {
    id?: number;
    tag: string;
}

export interface Question {
    id: number;
    questionTitle: string;
    questionText: string;
    questionAttatchments: PostAttatchments[];
    questioner: User;
    createdAt: Date;
    questionTag: Tag[];
}

export interface ValidationError {
    message: string;
    response: {
        data: {
            message: string;
        };
    };
}

export interface Attatchments {
    id: number;
    link: string;
}

export interface PostAttatchments {
    id?: number;
    link: string;
}

export interface Post {
    id: number;
    postText: string;
    postAttatchments: Attatchments[];
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
    username: string;
    accessToken: string;
}
