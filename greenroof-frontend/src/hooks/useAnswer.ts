import { useQuery } from "@tanstack/react-query";
import { User } from "./useProfile";
import apiClient from "../services/api-client";

export interface Answer {
    id: number;
    answerText: string;
    answerer: User;
    score: number;
    createdAt: Date;
}

const useAnswer = (id: number) => {
    return useQuery<Answer[], Error>({
        queryKey: ["answers"],
        queryFn: () => {
            return apiClient
                .get<Answer[]>("/forum/answer?questionId=" + id)
                .then((res) => res.data);
        },
    });
};

export default useAnswer;
