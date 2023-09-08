import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    score: number;
    profilePhoto: string;
}

const useTopUser = () => {
    return useQuery<User[], Error>({
        queryKey: ["top-user"],
        queryFn: () => {
            return apiClient
                .get<User[]>("/forum/feed/top-user")
                .then((res) => res.data);
        },
    });
};

export default useTopUser;
