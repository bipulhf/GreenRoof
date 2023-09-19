import { useQuery } from "@tanstack/react-query";
import { User, UserProfile } from "../services/types";
import APIClient from "../services/apiClient";

const userApiClient = new APIClient<User, UserProfile>("");

const useProfile = (username: string) => {
    return useQuery<User[], Error>({
        queryKey: ["user", username],
        queryFn: () =>
            userApiClient.getAll("/forum/search/user?username=" + username),
    });
};

const useGetUser = (username: string) => {
    return useQuery<User, Error>({
        queryKey: ["user", username],
        queryFn: () => userApiClient.get("/user", { params: username }),
    });
};

export { useGetUser, useProfile };
