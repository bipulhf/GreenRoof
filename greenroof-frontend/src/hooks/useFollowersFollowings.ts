import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Follower, Following, ValidationError } from "../services/types";
import { token } from "../services/jwt-token";

interface IsFollow {
    isFollow: boolean;
}

const followerApiClient = new APIClient<Follower[], Follower>("/community");
const followingApiClient = new APIClient<Following[], Following>("/community");
const isFollowApiClient = new APIClient<IsFollow, IsFollow>("/community");

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
const useFollwings = (username: string) => {
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
                queryKey: ["followers"],
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
                queryKey: ["followers"],
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
export { useFollowers, useFollwings, useFollows, useUnfollow, useIsFollow };
