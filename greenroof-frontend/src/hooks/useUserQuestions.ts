import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/ApiClient";
import { Question } from "../services/Types";

const questionApiClient = new APIClient<Question, Question>("/forum/feed");

const useUserQuestions = (username: string) => {
    return useQuery<Question[], Error>({
        queryKey: ["question", username],
        queryFn: () => questionApiClient.getAll("/user?username=" + username),
    });
};

export default useUserQuestions;
