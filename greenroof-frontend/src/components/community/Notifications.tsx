import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clear } from "../../context/deliveredNotifs";
import { Notif } from "../../services/types";
import CommunityHeading from "./CommunityHeading";

export default function Notifications() {
    const { auth } = useAuth();
    const [notifications, setNotifications] = useState<Array<Notif>>([]);
    const dispatch = useDispatch();

    const username = auth.username;
    const jwtToken = auth.accessToken;
    const BASE_URL = "http://localhost:8080/api/v1/notification/";

    const getAllNotifs = (username: string) => {
        return axios.get(BASE_URL + username, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    };
    const changeNotifStatusToRead = (notifID: number) => {
        return axios.patch(BASE_URL + "/read/" + notifID, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    };

    const fetchData = async () => {
        dispatch(clear());
        const data = await (await getAllNotifs(username)).data;
        setNotifications(data);
    };

    const readNotif = async (id: number) => {
        await changeNotifStatusToRead(id);
        fetchData();
    };

    useEffect(() => {
        if (username.length === 0 || jwtToken.length === 0) return;
        fetchData();
    }, [auth]);

    return (
        <>
            <div className="pb-[10%] min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
                <CommunityHeading heading="Notifications" />
                {notifications.map((x) => (
                    <div className="flex justify-between p-2">
                        <div
                            key={x.id}
                            className={`${
                                x.read == false ? `bg-graybg font-semibold` : ``
                            } font-medium text-2xl p-3 flex`}
                        >
                            <img
                                src={x.userFrom.profilePhoto}
                                alt={x.userFrom.username + " photo"}
                                className="col-span-1 ml-5 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] rounded-full"
                            />
                            <span className="ml-5 self-center">
                                {x.content}
                            </span>
                        </div>
                        <button onClick={() => readNotif(x.id)} className="">
                            Read
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
