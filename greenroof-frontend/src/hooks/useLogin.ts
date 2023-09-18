import { useMutation, useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { ValidationError } from "../services/types";
import useAuth from "./useAuth";

interface LoginInfo {
    username: string;
    password: string;
    access_token?: string;
    refresh_token?: string;
}

interface RefreshToken {
    refresh_token: string;
}

const loginApiClient = new APIClient<LoginInfo, LoginInfo>("/auth");
const refreshApiClient = new APIClient<RefreshToken, string>("/auth");

const useCreateLogin = () => {
    const { setAuth } = useAuth();
    return useMutation({
        mutationFn: (login: LoginInfo) =>
            loginApiClient.login("/authenticate", login).then((data) => {
                setAuth({
                    name: login.username,
                    accessToken: data.access_token || "",
                });
                localStorage.setItem("name", login.username);
                localStorage.setItem("accessToken", data.access_token || "");
                return data;
            }),
        onError: (err: ValidationError) => err,
    });
};

const useRefreshTkn = (refreshTkn: string) => {
    const headers = { Authorization: `Bearer ${refreshTkn}` };
    return useQuery({
        queryKey: ["rfrsh-tkn"],
        queryFn: () =>
            refreshApiClient.post("/refresh-token", headers, refreshTkn),
    });
};
export { useCreateLogin, useRefreshTkn };
