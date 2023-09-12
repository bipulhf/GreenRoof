import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

interface HasVoted {
    voteNo?: number;
}

const answerApiClient = new APIClient<HasVoted, HasVoted>("/forum");

const useVote = (token: string, answerId: number) => {
    const queryClient = new QueryClient();
    const headers = { Authorization: `Bearer ${token}` };
    return useMutation({
        mutationFn: (up: boolean) =>
            answerApiClient.post(
                "/answer/vote/" + answerId + (up ? "/up" : "/down"),
                headers,
                {}
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["answer", answerId],
            });
        },
    });
};

const useGetVoteStatus = (token: string, answerId: number) => {
    const headers = { Authorization: `Bearer ${token}` };
    return useQuery<HasVoted, Error>({
        queryKey: ["vote", answerId],
        queryFn: () =>
            answerApiClient.getWithAuth(
                "/answer/vote?answerId=" + answerId,
                headers
            ),
    });
};

export { useVote, useGetVoteStatus };
