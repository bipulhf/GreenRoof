import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { PostAttatchments, Question, ValidationError } from "../services/types";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

interface QuestionText {
    questionTitle: string;
    questionText: string;
    forumAttatchments?: PostAttatchments[];
}
interface Tags {
    id: number;
    tags: string;
}

const questionApiClient = new APIClient<Question, QuestionText>("/forum");
const tagsApiClient = new APIClient<Tags, QuestionText>("/forum");

const useGetQuestion = (questionId: number) => {
    return useQuery<Question, Error>({
        queryKey: ["question", questionId],
        queryFn: () =>
            questionApiClient.get("/feed/question?questionId=" + questionId),
    });
};

const useCreateQuestion = () => {
    const navigate = useNavigate();
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (question: QuestionText) =>
            questionApiClient.post("/question/create", headers, question),
        onSuccess: () => {
            navigate("/forum");
            query.invalidateQueries({
                queryKey: ["forum"],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useEditQuestion = (questionId: number) => {
    const navigate = useNavigate();
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (question: QuestionText) =>
            questionApiClient.update(
                "/question/update",
                headers,
                questionId,
                question
            ),
        onSuccess: () => {
            navigate("/forum/post/" + questionId);
            query.invalidateQueries({
                queryKey: ["question", questionId],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useDeleteQuestion = () => {
    const navigate = useNavigate();
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (id: number) =>
            questionApiClient.delete("/question/delete", headers, id),
        onSuccess: () => {
            navigate("/forum");
            query.invalidateQueries({
                queryKey: ["forum"],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useGetTags = () => {
    return useQuery<Tags[], Error>({
        queryKey: ["tags"],
        queryFn: () => tagsApiClient.getAll("/feed/tags"),
    });
};

export {
    useGetQuestion,
    useCreateQuestion,
    useEditQuestion,
    useDeleteQuestion,
    useGetTags,
};
