import { useState, useEffect } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import useAuth from "../../hooks/useAuth";

const PushNotifications = () => {
  const { auth } = useAuth();
  const username = auth.username;
  const jwtToken = auth.accessToken;

  useEffect(() => {
    if (username.length === 0 || jwtToken.length === 0) return;
    const URL = "http://localhost:8080/push-notifications/" + username;

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
          }
        },
      });
    };
    fetchData();
  }, [auth]);

  return (
    <>
      <div></div>
    </>
  );
};

export default PushNotifications;
