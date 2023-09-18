import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Follower, Following, ValidationError } from "../services/types";
import { token } from "../services/jwt-token";

interface IsFollow {
    isFollow: boolean;
}
interface TotalNumber {
    total: number;
}

const followerApiClient = new APIClient<Follower[], Follower>("/community");
const followingApiClient = new APIClient<Following[], Following>("/community");
const isFollowApiClient = new APIClient<IsFollow, IsFollow>("/community");
const totalNumberApiClient = new APIClient<TotalNumber, TotalNumber>(
    "/community"
);

const useTotalFollowers = (username: string) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useQuery<TotalNumber, Error>({
        queryKey: ["followers-number", username],
        queryFn: () =>
            totalNumberApiClient.getWithAuth("/total/followers", {
                headers: headers,
                params: { username: username },
            }),
    });
};

const useTotalFollowings = (username: string) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useQuery<TotalNumber, Error>({
        queryKey: ["followings-number", username],
        queryFn: () =>
            totalNumberApiClient.getWithAuth("/total/followings", {
                headers: headers,
                params: { username: username },
            }),
    });
};

const useFollowers = (username: string) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useQuery<Follower[], Error>({
        queryKey: ["followers", username],
        queryFn: () =>
            followerApiClient.getWithAuth("/followers", {
                headers: headers,
                params: { username: username },
            }),
    });
};
const useFollowings = (username: string) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useQuery<Following[], Error>({
        queryKey: ["followings", username],
        queryFn: () =>
            followingApiClient.getWithAuth("/followings", {
                headers: headers,
                params: { username: username },
            }),
    });
};

const useFollows = (username: string) => {
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: () =>
            isFollowApiClient.follow("/follows/" + username, headers),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["followers-number"],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useUnfollow = (username: string) => {
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: () =>
            followingApiClient.unfollow("/unfollows/" + username, headers),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["followers-number"],
            });
        },
        onError: (err: ValidationError) => err,
    });
};
const useIsFollow = (username: string) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useQuery<IsFollow, Error>({
        queryKey: ["isFollow", username],
        queryFn: () =>
            isFollowApiClient.getWithAuth("/isFollow/" + username, {
                headers: headers,
            }),
    });
};
export {
    useFollowers,
    useFollowings,
    useFollows,
    useUnfollow,
    useIsFollow,
    useTotalFollowers,
    useTotalFollowings,
};
