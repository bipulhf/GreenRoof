import { useDispatch } from "react-redux";
import { Notif } from "../../services/types";
import { removeFromToastList } from "../../context/deliveredNotifs";

interface Props {
    notif: Notif;
}

export default function ToastNotification({ notif }: Props) {
    const dispatch = useDispatch();

    return (
        <>
            <button
                onClick={() => {
                    dispatch(removeFromToastList({ notifID: notif.id }));
                }}
            >
                {notif.content}
            </button>
        </>
    );
}
