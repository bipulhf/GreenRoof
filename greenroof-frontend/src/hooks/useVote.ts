import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/ApiClient";
import { ValidationError } from "../services/Types";
import useAuth from "./useAuth";

interface HasVoted {
    voteNo?: number;
}

const answerApiClient = new APIClient<HasVoted, HasVoted>("/forum");

const useVote = (answerId: number) => {
    const queryClient = useQueryClient();
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useMutation({
        mutationFn: (up: boolean) =>
            answerApiClient.post(
                "/answer/vote/" + answerId + (up ? "/up" : "/down"),
                headers,
                {}
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["answer"],
            });
        },
        onError: (err: ValidationError) => err,
    });
};

const useGetVoteStatus = (answerId: number) => {
    const { auth } = useAuth();
    const headers = { Authorization: `Bearer ${auth.accessToken}` };
    return useQuery<HasVoted, ValidationError>({
        queryKey: ["vote", answerId],
        queryFn: () =>
            answerApiClient.getWithAuth("/answer/vote?answerId=" + answerId, {
                headers,
            }),
    });
};

export { useVote, useGetVoteStatus };
