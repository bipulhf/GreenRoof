import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";

const useQuestionDelete = (token: string) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (id: number) =>
            apiClient.delete("/forum/question/delete/" + id, { headers }),
    });
};

export default useQuestionDelete;
