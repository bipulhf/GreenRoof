import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Content, Post, ValidationError } from "../services/types";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

interface PostText {
    postText: string;
}

const contentApiClient = new APIClient<Content<Post>, Post>("/community");
const postApiClient = new APIClient<Post, PostText>("/community");

const useTopPost = () => {
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
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
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
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
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () =>
            postApiClient.getWithAuth("/feed/post", {
                params: { postId: postId },
                headers: headers,
            }),
    });
};

const useSearchPost = (text: string) => {
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useQuery<Post[], Error>({
        queryKey: ["search-post", text],
        queryFn: () =>
            postApiClient.getAllWithAuth("/search/post", {
                params: { text: text },
                headers: headers,
            }),
    });
};

const useGetUserPost = (username: string) => {
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useInfiniteQuery<Content<Post>, Error>({
        queryKey: ["community-post", username],
        queryFn: ({ pageParam = 0 }) =>
            contentApiClient.getWithAuth("/feed/user", {
                headers: headers,
                params: { pageNo: pageParam, username: username },
            }),
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.pageNo + 1,
    });
};

const useCreatePost = () => {
    const navigate = useNavigate();
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
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

const useEditPost = (postId: number) => {
    const navigate = useNavigate();
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
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

const useDeletePost = () => {
    const navigate = useNavigate();
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
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
    useGetUserPost,
    useSearchPost,
};
