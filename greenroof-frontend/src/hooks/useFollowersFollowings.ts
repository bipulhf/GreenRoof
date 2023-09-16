import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Follower, Following } from "../services/types";
import { token } from "../services/jwt-token";

const followerApiClient = new APIClient<Follower[], Follower>("/community");
const followingApiClient = new APIClient<Following[], Following>("/community");

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

export { useFollowers, useFollwings };
