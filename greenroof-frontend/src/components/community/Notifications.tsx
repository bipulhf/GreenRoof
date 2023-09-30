import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clear } from "../../context/deliveredNotifs";
import { Notif } from "../../services/types";
import CommunityHeading from "./CommunityHeading";
import { Link } from "react-router-dom";
import { useGetAllNotifs, useReadNotif } from "../../hooks/useNotification";

export default function Notifications() {
    const { data } = useGetAllNotifs();
    const mutation = useReadNotif();
    const [notifications, setNotifications] = useState<Notif[]>([]);
    const dispatch = useDispatch();

    const readNotif = (id: number) => {
        mutation.mutate(id);
        dispatch(clear());
    };

    useEffect(() => {
        if (data) setNotifications(data);
    }, [data]);

    return (
        <>
            <div className="pb-[10%] min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
                <CommunityHeading heading="Notifications" />
                {notifications.length === 0 && (
                    <p className="text-gray dark:text-graybg font-medium text-center text-xl pt-5">
                        Nothing to show.
                    </p>
                )}
                {notifications.map((x) => (
                    <div className="flex justify-between p-2" key={x.id}>
                        <div
                            key={x.id}
                            className={`${
                                x.read == false
                                    ? `bg-graybg dark:bg-darkprimary font-semibold`
                                    : ``
                            } font-medium text-2xl p-3 flex justify-between w-full`}
                        >
                            <div className="flex">
                                <img
                                    src={x.userFrom.profilePhoto}
                                    alt={x.userFrom.username + " photo"}
                                    className="col-span-1 ml-5 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] rounded-full"
                                />
                                <Link
                                    to={`/community/post/${x.communityPost.id}`}
                                    onClick={() => readNotif(x.id)}
                                    className="ml-5 self-center dark:text-white"
                                >
                                    {x.content}
                                </Link>
                            </div>
                            <p className="text-gray text-[12px] self-center">
                                {new Date(x.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
