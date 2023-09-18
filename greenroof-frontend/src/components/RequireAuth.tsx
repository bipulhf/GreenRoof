import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function RequireAuth({ children }: Props) {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        <>
            {auth.name && auth.accessToken ? (
                children
            ) : (
                <Navigate to={"/login"} state={{ from: location }} replace />
            )}
        </>
    );
}
