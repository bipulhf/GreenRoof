import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Content, Question } from "../services/types";

const contentApiClient = new APIClient<Content, Question>("/forum");

const useContent = () => {
    return useInfiniteQuery<Content, Error>({
        queryKey: ["forum"],
        queryFn: ({ pageParam = 0 }) =>
            contentApiClient.get("/feed/recent", {
                params: { pageNo: pageParam },
            }),
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.pageNo + 1,
    });
};

const useSearch = (searchText: string) => {
    return useInfiniteQuery<Content, Error>({
        queryKey: ["search", searchText],
        queryFn: ({ pageParam = 0 }) =>
            contentApiClient.get("/search/post", {
                params: { text: searchText, pageNo: pageParam },
            }),
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.pageNo + 1,
    });
};

export { useContent, useSearch };
