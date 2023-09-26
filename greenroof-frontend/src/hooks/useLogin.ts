import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AuthObject, ValidationError } from "../services/types";
import useAuth from "./useAuth";

interface LoginInfo {
    username: string;
    password: string;
    access_token?: string;
    refresh_token?: string;
}

interface RegistrationInfo {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    city: string;
}

interface TokenPayload {
    username: string;
    accessToken: string;
}

interface PasswordResetRequest {
    email?: string;
    newPassword?: string;
}

interface IsTokenValid {
    isTokenValid: boolean;
}

const loginApiClient = new APIClient<LoginInfo, LoginInfo>("/auth");
const registrationApiClient = new APIClient<RegistrationInfo, RegistrationInfo>(
    "/registration"
);
const passwordResetApiClient = new APIClient<
    PasswordResetRequest,
    PasswordResetRequest
>("/registration");
const validTokenApiClient = new APIClient<TokenPayload, TokenPayload>("/auth");

const useCreateLogin = () => {
    const { setAuth } = useAuth();
    return useMutation({
        mutationFn: (login: LoginInfo) =>
            loginApiClient.login("/authenticate", login).then((data) => {
                setAuth({
                    username: login.username,
                    accessToken: data.access_token || "",
                });
                localStorage.setItem("name", login.username);
                localStorage.setItem("accessToken", data.access_token || "");
                return data;
            }),
        onError: (err: ValidationError) => err,
    });
};

const useLogout = () => {
    return useMutation({
        mutationFn: () => loginApiClient.login("/logout"),
        onError: (err: ValidationError) => err,
    });
};

const useTokenValidity = () => {
    return useMutation({
        mutationFn: (auth: AuthObject) =>
            validTokenApiClient.login("/isTokenValid", auth).then((data) => {
                const validityOfToken = data as unknown as IsTokenValid;
                return validityOfToken;
            }),
        onError: (err: ValidationError) => err,
    });
};

const useRegistration = () => {
    return useMutation({
        mutationFn: (regInfo: RegistrationInfo) =>
            registrationApiClient.login("/register", regInfo),
        onError: (err: ValidationError) => err,
    });
};

const usePasswordReset = () => {
    return useMutation({
        mutationFn: (email: PasswordResetRequest) =>
            passwordResetApiClient.login("/password-reset-request", email),
        onError: (err: ValidationError) => err,
    });
};

const useNewPassword = (token: string) => {
    return useMutation({
        mutationFn: (newPassword: PasswordResetRequest) => {
            console.log(newPassword, token);
            return passwordResetApiClient.login(
                "/reset-password?token=" + token,
                newPassword
            );
        },
        onError: (err: ValidationError) => err,
    });
};

export {
    useCreateLogin,
    useTokenValidity,
    useLogout,
    useRegistration,
    usePasswordReset,
    useNewPassword,
};
