import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface Question {
    questionTitle: string;
    questionText: string;
}

const useEditQ = (token: string, id: number) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (question: Question) =>
            apiClient.put("/forum/question/update/" + id, question, {
                headers,
            }),
    });
};

export default useEditQ;
