import axios from "axios";

export default function CreateChannel(user1: string, user2: string) {
    const sendBirdURL = import.meta.env.VITE_SEND_BIRD_URL;
    const apiToken = import.meta.env.VITE_SEND_BIRD_API_KEY;

    const data = {
        is_distinct: true,
        user_ids: [user1, user2],
        operator_ids: [user1, user2],
        is_public: false,
    };

    return new Promise<string>((resolve) => {
        axios
            .post(sendBirdURL, data, {
                headers: {
                    "Api-Token": apiToken,
                },
            })
            .then((response) => {
                resolve(response.data.channel_url);
            });
    });
}
