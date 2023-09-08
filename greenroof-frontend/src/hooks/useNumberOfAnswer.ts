import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface Noa {
    noa: number;
}

const useNumberOfAnswer = (id: number) => {
    return useQuery<Noa>({
        queryKey: ["NoOfAnswer", id],
        queryFn: () => {
            return apiClient
                .get<Noa>("/forum/feed/answer-number?questionId=" + id)
                .then((res) => res.data);
        },
    });
};

export default useNumberOfAnswer;
