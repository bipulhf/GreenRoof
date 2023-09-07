import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    city: string;
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

const useProfile = (username: string) => {
    return useQuery<User[], Error>({
        queryKey: ["user", username],
        queryFn: () => {
            return apiClient
                .get<User[]>("/forum/search/user?username=" + username)
                .then((res) => res.data);
        },
    });
};

export default useProfile;
