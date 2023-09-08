import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface Question {
    questionTitle: string;
    questionText: string;
}

const useCreateQ = (token: string) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (question: Question) =>
            apiClient.post("/forum/question/create", question, { headers }),
    });
};

export default useCreateQ;
