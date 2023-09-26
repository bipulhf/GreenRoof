/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";
import { AuthObject } from "../services/types";
import { useTokenValidity } from "../hooks/useLogin";
import { useGetUser } from "../hooks/useProfile";

interface Props {
    children?: ReactNode;
}

interface IAuthContext {
    auth: AuthObject;
    setAuth: Dispatch<SetStateAction<AuthObject>>;
}

const defaultState = {
    auth: {
        username: localStorage.getItem("name"),
        accessToken: localStorage.getItem("accessToken"),
    },
    setAuth: (auth: AuthObject) => {},
} as IAuthContext;

const AuthContext = createContext(defaultState);

export const AuthProvider = ({ children }: Props) => {
    const mutation = useTokenValidity();
    const [auth, setAuth] = useState<AuthObject>({
        username: "",
        accessToken: "",
    });

    useEffect(() => {
        if (localStorage.getItem("name") && localStorage.getItem("accessToken"))
            mutation.mutate({
                username: localStorage.getItem("name") || "",
                accessToken: localStorage.getItem("accessToken") || "",
            });
    }, []);

    useEffect(() => {
        if (
            mutation.data?.isTokenValid &&
            localStorage.getItem("name") &&
            localStorage.getItem("accessToken")
        ) {
            setAuth({
                username: localStorage.getItem("name") || "",
                accessToken: localStorage.getItem("accessToken") || "",
            });
        }
    }, [mutation.data]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
