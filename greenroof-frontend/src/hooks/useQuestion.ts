import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Question } from "../services/types";

interface QuestionText {
    questionTitle: string;
    questionText: string;
}

const questionApiClient = new APIClient<Question, QuestionText>("/forum");
const feedApiClient = new APIClient<Question, QuestionText>("/forum/feed");

const useGetQuestion = (questionId: number) => {
    return useQuery<Question, Error>({
        queryKey: ["question", questionId],
        queryFn: () => feedApiClient.get("/question?questionId=" + questionId),
    });
};

const useCreateQuestion = (token: string) => {
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (question: QuestionText) =>
            questionApiClient.post("/question/create", headers, question),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["forum"],
            });
        },
    });
};

const useEditQuestion = (token: string, questionId: number) => {
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (question: QuestionText) =>
            questionApiClient.update(
                "/question/update",
                headers,
                questionId,
                question
            ),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["question", questionId],
            });
        },
    });
};

const useDeleteQuestion = (token: string) => {
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (id: number) =>
            questionApiClient.delete("/question/delete", headers, id),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["forum"],
            });
        },
    });
};

export {
    useGetQuestion,
    useCreateQuestion,
    useEditQuestion,
    useDeleteQuestion,
};
