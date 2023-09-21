import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clear } from "../../context/deliveredNotifs";

export default function Notifications() {
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState([]);
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
      <div>
        {notifications.map((x) => (
          <div key={x.id} className={x.read == false ? "bg-blue" : "bg-green"}>
            <span>{x.content}</span>
            <button onClick={() => readNotif(x.id)} className="">
              Read
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
