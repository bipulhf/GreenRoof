import { useQuery } from "@tanstack/react-query";
import { User, UserProfile } from "../services/types";
import APIClient from "../services/apiClient";

const userApiClient = new APIClient<UserProfile, User>("/forum/search");

const useProfile = (username: string) => {
    return useQuery<UserProfile[], Error>({
        queryKey: ["user", username],
        queryFn: () => userApiClient.getAll("/user?username=" + username),
    });
};

export default useProfile;
