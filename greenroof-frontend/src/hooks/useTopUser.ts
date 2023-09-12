import { useQuery } from "@tanstack/react-query";
import { User, UserProfile } from "../services/types";
import APIClient from "../services/apiClient";

const userApiClient = new APIClient<User, UserProfile>("/forum/feed");

const useTopUser = () => {
    return useQuery<User[], Error>({
        queryKey: ["top-user"],
        queryFn: () => userApiClient.getAll("/top-user"),
    });
};

export default useTopUser;
