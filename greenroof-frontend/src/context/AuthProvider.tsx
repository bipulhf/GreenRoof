/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";
import { AuthObject } from "../services/types";

interface Props {
    children?: ReactNode;
}

interface IAuthContext {
    auth: AuthObject;
    setAuth: Dispatch<SetStateAction<AuthObject>>;
}

const defaultState = {
    auth: {
        name: localStorage.getItem("name"),
        accessToken: localStorage.getItem("accessToken"),
    },
    setAuth: (auth: AuthObject) => {},
} as IAuthContext;

const AuthContext = createContext(defaultState);

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<AuthObject>({
        name: localStorage.getItem("name") || "",
        accessToken: localStorage.getItem("accessToken") || "",
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
