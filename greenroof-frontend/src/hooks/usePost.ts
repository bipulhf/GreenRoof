import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Content, Post, ValidationError } from "../services/types";
import { token } from "../services/jwt-token";
import { useNavigate } from "react-router-dom";

interface PostText {
    postText: string;
}

const contentApiClient = new APIClient<Content<Post>, Post>("/community");
const postApiClient = new APIClient<Post, PostText>("/community");

const useTopPost = () => {
    const headers = { Authorization: `Bearer ${token}` };
    return useInfiniteQuery<Content<Post>, Error>({
        queryKey: ["community-top"],
        queryFn: ({ pageParam = 0 }) =>
            contentApiClient.getWithAuth("/feed", {
                headers: headers,
                params: { pageNo: pageParam },
            }),
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.pageNo + 1,
    });
};

const useLatestPost = () => {
    const headers = { Authorization: `Bearer ${token}` };
    return useInfiniteQuery<Content<Post>, Error>({
        queryKey: ["community-recent"],
        queryFn: ({ pageParam = 0 }) =>
            contentApiClient.getWithAuth("/feed/recent", {
                headers: headers,
                params: { pageNo: pageParam },
            }),
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.pageNo + 1,
    });
};

const useGetPost = (postId: number) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () =>
            postApiClient.getWithAuth("/feed/post", {
                params: { postId: postId },
                headers: headers,
            }),
    });
};

const useCreatePost = () => {
    const navigate = useNavigate();
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (post: PostText) =>
            postApiClient.post("/post/create", headers, post),
        onSuccess: () => {
            navigate("/community");
            query.invalidateQueries({
                queryKey: ["community-recent"],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useEditPost = (token: string, postId: number) => {
    const navigate = useNavigate();
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (post: PostText) =>
            postApiClient.update("/post/update", headers, postId, post),
        onSuccess: () => {
            navigate("/community/post/" + postId);
            query.invalidateQueries({
                queryKey: ["post", postId],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useDeletePost = (token: string) => {
    const navigate = useNavigate();
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (id: number) =>
            postApiClient.delete("/post/delete", headers, id),
        onSuccess: () => {
            navigate("/community");
            query.invalidateQueries({
                queryKey: ["community-recent"],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

export {
    useLatestPost,
    useTopPost,
    useGetPost,
    useDeletePost,
    useCreatePost,
    useEditPost,
};
