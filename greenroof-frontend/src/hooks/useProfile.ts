import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { User, UserProfile } from "../services/Types";
import APIClient from "../services/ApiClient";
import useAuth from "./useAuth";

interface Name {
    firstName: string;
    lastName: string;
}

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
        queryFn: () =>
            userApiClient.get("/user", { params: { username: username } }),
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
            return userApiClient.changeUserInfo(
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

const useProfileName = () => {
    const query = new QueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (UserBasicInfo: Name) => {
            return userApiClient.changeUserInfo(
                "/user/info",
                headers,
                UserBasicInfo
            );
        },
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["user", auth.username],
            });
        },
    });
};

const useBanUser = () => {
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (username: string) => {
            return userApiClient.follow("/user/ban/" + username, headers);
        },
    });
};

export {
    useGetUser,
    useProfile,
    useFollowingRecommendation,
    useProfilePhoto,
    useProfileName,
    useBanUser,
};
