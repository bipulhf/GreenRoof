import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Answer } from "../services/types";

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

const useGetAnswer = (token: string, answerId: number) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useQuery<Answer, Error>({
        queryKey: ["answer", answerId],
        queryFn: () =>
            answerApiClient.getWithAuth(
                "/answer/get?answerId=" + answerId,
                headers
            ),
    });
};

const useCreateAnswer = (token: string, questionId: number) => {
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (answer: AnswerText) =>
            answerApiClient.post("/answer/add/" + questionId, headers, answer),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["answer"],
            });
        },
        onError: (err) => err,
    });
};

const useEditAnswer = (token: string, answerId: number) => {
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (answer: AnswerText) =>
            answerApiClient.update("/answer/update", headers, answerId, answer),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["answer", answerId],
            });
        },
    });
};

const useDeleteAnswer = (token: string) => {
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (id: number) =>
            answerApiClient.delete("/answer/delete", headers, id),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["answer"],
            });
        },
    });
};

export {
    useGetAnswers,
    useGetAnswer,
    useCreateAnswer,
    useEditAnswer,
    useDeleteAnswer,
};
