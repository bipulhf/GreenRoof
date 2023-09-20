import axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function Notifications() {
  const { auth } = useAuth();

  const username = auth.username;

  const NotifApi = "localhost:8080/api/v1/notification/" + username;

  axios.get(NotifApi);

  return <></>;
}
