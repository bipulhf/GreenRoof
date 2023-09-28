import { useEffect } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../context/deliveredNotifs";
import { Notif } from "../../services/types";
import ToastNotification from "./ToastNotification";

interface NotifState {
    notifs: Notif[];
    notifToastList: Notif[];
}
interface RootState {
    deliveredNotifs: NotifState;
}

const PushNotifications = () => {
    const { auth } = useAuth();
    const username = auth.username;
    const jwtToken = auth.accessToken;

    const allDeliveredNotifs = useSelector(
        (state: RootState) => state.deliveredNotifs.notifs
    );

    const notifToastList = useSelector(
        (state: RootState) => state.deliveredNotifs.notifToastList
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (username.length === 0 || jwtToken.length === 0) return;
        const URL = "http://localhost:8080/push-notifications";

        const fetchData = async () => {
            await fetchEventSource(URL, {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${jwtToken}`,
                },
                openWhenHidden: true,
                onmessage(event) {
                    const parsedData = JSON.parse(event.data);
                    if (parsedData.length != 0) {
                        console.log(parsedData);
                        dispatch(add({ newNotifs: parsedData }));
                    }
                },
            });
        };
        fetchData();
    }, [auth]);

    return (
        <>
            {allDeliveredNotifs.length}
            <br />
            {notifToastList.map((notif) => (
                <ToastNotification notif={notif} />
            ))}
        </>
    );
};

export default PushNotifications;
