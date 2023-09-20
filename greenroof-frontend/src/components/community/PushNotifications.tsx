import { useState, useEffect } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const URL = "http://localhost:8080/push-notifications/1";

const PushNotifications = () => {
  const [data, setData] = useState([]);
  const jwtToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaGlmYXQ3MSIsImlhdCI6MTY5NTIxNTI3MywiZXhwIjoxNjk1ODIwMDczfQ.ddx867_2r2u_s_ZhTMSaDsCNbxgPuRlHjY-lq84WPGg";
  useEffect(() => {
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
  }, []);

  return (
    <>
      <div>
        <h1>hi</h1>
        <h1>{data}</h1>
      </div>
    </>
  );
};

export default PushNotifications;
