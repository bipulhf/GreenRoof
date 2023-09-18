import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Comment, Content, ValidationError } from "../services/types";
import useAuth from "./useAuth";

interface CommentText {
    commentText: string;
}
interface NumberOfComments {
    numberOfComments: number;
}

const commentApiClient = new APIClient<Content<Comment>, CommentText>(
    "/community"
);
const singleCommentApiClient = new APIClient<Comment, CommentText>(
    "/community/comment"
);
const commentCountApiClient = new APIClient<NumberOfComments, CommentText>(
    "/community/comment"
);

const useGetComments = (postId: number) => {
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useInfiniteQuery<Content<Comment>, Error>({
        queryKey: ["community-comment", postId],
        queryFn: ({ pageParam = 0 }) =>
            commentApiClient.getWithAuth("/comment", {
                headers: headers,
                params: { postId: postId, pageNo: pageParam },
            }),
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.pageNo + 1,
    });
};

const useGetComment = (commentId: number) => {
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useQuery<Comment, Error>({
        queryKey: ["community-comment", commentId],
        queryFn: () =>
            singleCommentApiClient.getWithAuth(`${commentId}`, {
                headers: headers,
            }),
    });
};

const useGetNumberOfComment = (postId: number) => {
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useQuery<NumberOfComments, Error>({
        queryKey: ["community-comment-number", postId],
        queryFn: () =>
            commentCountApiClient.getWithAuth("/count/" + postId, {
                headers: headers,
            }),
    });
};

const useCreateComment = (postId: number) => {
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (comment: CommentText) =>
            singleCommentApiClient.post("/add/" + postId, headers, comment),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["community-comment", postId],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useEditComment = (commentId: number) => {
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (comment: CommentText) =>
            singleCommentApiClient.update(
                "/update",
                headers,
                commentId,
                comment
            ),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["community-comment"],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useDeleteComment = () => {
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (id: number) =>
            singleCommentApiClient.delete("/delete", headers, id),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["community-comment"],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

export {
    useGetComments,
    useGetComment,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useGetNumberOfComment,
};
