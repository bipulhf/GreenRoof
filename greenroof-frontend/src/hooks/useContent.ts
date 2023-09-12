import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Content, Question } from "../services/types";

const contentApiClient = new APIClient<Content, Question>("/forum/feed");

const useContent = () => {
    return useQuery<Content, Error>({
        queryKey: ["forum"],
        queryFn: () => contentApiClient.get("/recent"),
    });
};

export default useContent;
