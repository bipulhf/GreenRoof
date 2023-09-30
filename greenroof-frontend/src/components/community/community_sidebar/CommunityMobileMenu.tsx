import {
    faHouse,
    faBell,
    faMagnifyingGlass,
    faUser,
    faRobot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Notif } from "../../../services/types";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../../context/deliveredNotifs";

interface NotifState {
    notifs: Notif[];
    notifToastList: Notif[];
}
interface RootState {
    deliveredNotifs: NotifState;
}

export default function CommunityMobileMenu() {
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
        const URL = "http://localhost:8080/api/v1/push-notifications";

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
        <div className="md:hidden bg-white fixed w-[100%] bottom-0 z-10 pb-4 divide-y divide-graybg dark:divide-opacity-25 dark:bg-darkbg">
            <div></div>
            <div className="pt-3 flex justify-between px-10 dark:text-white">
                <Link to={"/community"}>
                    <FontAwesomeIcon icon={faHouse} fontSize={20} />
                </Link>
                <Link to={"/community/notifications"}>
                    <FontAwesomeIcon icon={faBell} fontSize={20} />
                    {allDeliveredNotifs.length > 0 && (
                        <span className="text-white bg-red rounded-full text-[11px] p-1">
                            {allDeliveredNotifs.length}
                        </span>
                    )}
                </Link>
                <Link to={"/AI"}>
                    <FontAwesomeIcon
                        icon={faRobot}
                        fontSize={20}
                        className="text-greenbtn dark:text-darksecondary"
                    />{" "}
                </Link>
                <Link to={"/community/search"}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={20} />
                </Link>
                <Link to={"/community/user/" + auth.username}>
                    <FontAwesomeIcon icon={faUser} fontSize={20} />
                </Link>
            </div>
        </div>
    );
}
