import { useQuery } from "@tanstack/react-query";
import { User, UserProfile } from "../services/types";
import APIClient from "../services/apiClient";
import useAuth from "./useAuth";

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

const useFollowingRecommendation = () => {
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useQuery<User[], Error>({
        queryKey: ["whotofollow"],
        queryFn: () =>
            userApiClient.getAllWithAuth("/community/whotofollow", {
                headers,
            }),
    });
};

export { useGetUser, useProfile, useFollowingRecommendation };
