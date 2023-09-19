import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogin";

export default function Logout() {
    const { auth, setAuth } = useAuth();
    const mutation = useLogout();
    useEffect(() => {
        setAuth({
            username: "",
            accessToken: "",
        });
        localStorage.clear();
        mutation.mutate();
    }, [auth]);
    return (
        <>
            <div>Logging Out...</div>
        </>
    );
}
