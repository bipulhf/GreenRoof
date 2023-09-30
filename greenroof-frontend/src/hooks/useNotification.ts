import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/ApiClient";
import { Notif } from "../services/Types";
import useAuth from "./useAuth";

const notifApiClient = new APIClient<Notif, Notif>("");

const useGetAllNotifs = () => {
    const { auth } = useAuth();
    return useQuery<Notif[], Error>({
        queryKey: ["notifications"],
        queryFn: () =>
            notifApiClient.getAllWithAuth("/notification", {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            }),
    });
};

const useReadNotif = () => {
    const { auth } = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (notifId: number) =>
            notifApiClient.patch("/notification/read/" + notifId, {
                Authorization: `Bearer ${auth.accessToken}`,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications"]);
        },
    });
};

export { useGetAllNotifs, useReadNotif };
