import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
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

const useProfilePhoto = () => {
    const query = new QueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (link: string) => {
            return userApiClient.uploadProfilePhoto(
                "/user/profile_picture",
                headers,
                {
                    link: link,
                }
            );
        },
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["user", auth.username],
            });
        },
    });
};

export { useGetUser, useProfile, useFollowingRecommendation, useProfilePhoto };
