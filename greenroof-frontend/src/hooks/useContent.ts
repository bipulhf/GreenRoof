import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Question } from "./useQuestion";

export interface Content {
    contentList: Question[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

const useContent = () => {
    return useQuery<Content, Error>({
        queryKey: ["forum"],
        queryFn: () => {
            return apiClient
                .get<Content>("/forum/feed/recent")
                .then((res) => res.data);
        },
    });
};

export default useContent;
