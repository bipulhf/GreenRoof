import axios from "axios";

export default function CreateChannel(user1:string, user2:string) {
   
  const sendBirdURL ="https://api-83DED529-E0E7-4BBB-AEB0-E78D67B2E2D0.sendbird.com/v3/group_channels";
const apiToken = "ebf287851ccc7acd28616cb625e2c288ce56e9ed";
   
  const data ={

    name: user1 + " chats with " + user2,
    channel_url: user1+"-"+user2,
    is_distinct: true,
     user_ids: [user1, user2,],
    operator_ids: [user1,user2],
    is_public: false
}

  return new Promise<string>((resolve) => {
    axios
    .post(sendBirdURL,data, {
      headers: {
        "Api-Token": apiToken,
      },
    })
    .then((response) => {    
        resolve( response.data.channel_url);
    })
});

}