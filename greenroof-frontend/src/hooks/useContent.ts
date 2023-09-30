import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/ApiClient";
import { Content, Question } from "../services/Types";

const contentApiClient = new APIClient<Content<Question>, Question>("/forum");

const useContent = () => {
    return useInfiniteQuery<Content<Question>, Error>({
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
    return useInfiniteQuery<Content<Question>, Error>({
        queryKey: ["search", searchText],
        queryFn: ({ pageParam = 0 }) =>
            contentApiClient.get("/search/post", {
                params: { text: searchText, pageNo: pageParam },
            }),
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.pageNo + 1,
    });
};

const useGetQuestionByTag = (tag: string) => {
    return useInfiniteQuery<Content<Question>, Error>({
        queryKey: ["question", tag],
        queryFn: ({ pageParam = 0 }) =>
            contentApiClient.get("/feed/questions", {
                params: { tag: tag, pageNo: pageParam },
            }),
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.pageNo + 1,
    });
};

export { useContent, useSearch, useGetQuestionByTag };
