import axios from "axios";

export default function updateSendBirdProfile(imgUrl:string, username: string) {
   
  const sendBirdURL =
  "https://api-83DED529-E0E7-4BBB-AEB0-E78D67B2E2D0.sendbird.com/v3/users/" +username;
const apiToken = "ebf287851ccc7acd28616cb625e2c288ce56e9ed";

  return new Promise<void>((resolve) => {
    axios
    .put(sendBirdURL, {
        profile_url:imgUrl
    }, {
      headers: {
        "Api-Token": apiToken,
      },
    })
    .then((response) => {
        resolve();
    })
});

}