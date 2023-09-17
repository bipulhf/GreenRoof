import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { ValidationError } from "../services/types";
import { token } from "../services/jwt-token";

interface NumberOfLikes {
    totalLikes?: number;
}
interface UserLiked {
    userLiked: boolean;
}

const likesNumberApiClient = new APIClient<NumberOfLikes, NumberOfLikes>(
    "/community/post"
);
const userLikedApiClient = new APIClient<UserLiked, UserLiked>(
    "/community/post"
);

const useGetNumberOfLikes = (postId: number) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useQuery<NumberOfLikes, Error>({
        queryKey: ["likes", postId],
        queryFn: () =>
            likesNumberApiClient.getWithAuth("/" + postId + "/like", {
                headers,
            }),
    });
};

const useLikedByUser = (postId: number) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useQuery<UserLiked, Error>({
        queryKey: ["liked-user", postId],
        queryFn: () =>
            userLikedApiClient.getWithAuth("/" + postId + "/userLike", {
                headers,
            }),
    });
};

const useLike = (postId: number) => {
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: () =>
            likesNumberApiClient.post("/" + postId + "/like", headers, {}),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["likes", postId],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

export { useGetNumberOfLikes, useLikedByUser, useLike };
