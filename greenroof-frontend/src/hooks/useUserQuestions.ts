import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Question } from "./useQuestion";

const useUserQuestions = (username: string) => {
    return useQuery<Question[], Error>({
        queryKey: ["user-question", username],
        queryFn: () => {
            return apiClient
                .get<Question[]>("/forum/feed/user?username=" + username)
                .then((res) => res.data);
        },
    });
};

export default useUserQuestions;
