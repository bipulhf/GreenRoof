import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Content, Question } from "../services/types";

const contentApiClient = new APIClient<Content, Question>("/forum/feed");

const useContent = () => {
    return useInfiniteQuery<Content, Error>({
        queryKey: ["forum"],
        queryFn: ({ pageParam = 0 }) =>
            contentApiClient.get("/recent", { params: { pageNo: pageParam } }),
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.pageNo + 1,
    });
};

export default useContent;
