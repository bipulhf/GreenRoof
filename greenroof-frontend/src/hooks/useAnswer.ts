import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Answer, ValidationError } from "../services/types";
import useAuth from "./useAuth";

interface AnswerText {
    answerText: string;
}

const answerApiClient = new APIClient<Answer, AnswerText>("/forum");

const useGetAnswers = (questionId: number) => {
    return useQuery<Answer[], Error>({
        queryKey: ["answer", questionId],
        queryFn: () =>
            answerApiClient.getAll("/answer?questionId=" + questionId),
    });
};

const useGetAnswer = (answerId: number) => {
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useQuery<Answer, Error>({
        queryKey: ["answer", answerId],
        queryFn: () =>
            answerApiClient.getWithAuth("/answer/get?answerId=" + answerId, {
                headers,
            }),
    });
};

const useCreateAnswer = (questionId: number) => {
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (answer: AnswerText) =>
            answerApiClient.post("/answer/add/" + questionId, headers, answer),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["answer"],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useEditAnswer = (answerId: number) => {
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (answer: AnswerText) =>
            answerApiClient.update("/answer/update", headers, answerId, answer),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["answer", answerId],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useDeleteAnswer = () => {
    const query = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (id: number) =>
            answerApiClient.delete("/answer/delete", headers, id),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["answer"],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

export {
    useGetAnswers,
    useGetAnswer,
    useCreateAnswer,
    useEditAnswer,
    useDeleteAnswer,
};
