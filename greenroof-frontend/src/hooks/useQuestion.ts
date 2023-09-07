import { useQuery } from "@tanstack/react-query";
import { User } from "./useProfile";
import apiClient from "../services/api-client";

export interface Question {
    id: number;
    questionTitle: string;
    questionText: string;
    questioner: User;
    createdAt: Date;
}

const useQuestion = (id: number) => {
    return useQuery<Question, Error>({
        queryKey: ["question", id],
        queryFn: () => {
            return apiClient
                .get<Question>("/forum/feed/question?questionId=" + id)
                .then((res) => res.data);
        },
    });
};

export default useQuestion;
