import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Question, ValidationError } from "../services/types";
import { useNavigate } from "react-router-dom";

interface QuestionText {
    questionTitle: string;
    questionText: string;
}

const questionApiClient = new APIClient<Question, QuestionText>("/forum");

const useGetQuestion = (questionId: number) => {
    return useQuery<Question, Error>({
        queryKey: ["question", questionId],
        queryFn: () =>
            questionApiClient.get("/feed/question?questionId=" + questionId),
    });
};

const useCreateQuestion = (token: string) => {
    const navigate = useNavigate();
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
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

const useEditQuestion = (token: string, questionId: number) => {
    const navigate = useNavigate();
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
            navigate("/forum/post/" + questionId);
            query.invalidateQueries({
                queryKey: ["question", questionId],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useDeleteQuestion = (token: string) => {
    const navigate = useNavigate();
    const query = useQueryClient();
    const headers = { Authorization: `Bearer ${token}` };
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

export {
    useGetQuestion,
    useCreateQuestion,
    useEditQuestion,
    useDeleteQuestion,
};
