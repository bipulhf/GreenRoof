import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Answer } from "../services/types";

interface NumberOfAnswers {
    noa: number;
}

const apiClient = new APIClient<NumberOfAnswers, Answer>("/forum/feed");

const useNumberOfAnswer = (questionId: number) => {
    return useQuery<NumberOfAnswers, Error>({
        queryKey: ["NoOfAnswer", questionId],
        queryFn: () => apiClient.get("/answer-number?questionId=" + questionId),
    });
};

export default useNumberOfAnswer;
