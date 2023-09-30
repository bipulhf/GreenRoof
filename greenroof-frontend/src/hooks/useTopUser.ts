import { useQuery } from "@tanstack/react-query";
import { User, UserProfile } from "../services/Types";
import APIClient from "../services/ApiClient";

const userApiClient = new APIClient<User, UserProfile>("/forum/feed");

const useTopUser = () => {
    return useQuery<User[], Error>({
        queryKey: ["top-user"],
        queryFn: () => userApiClient.getAll("/top-user"),
    });
};

export default useTopUser;
