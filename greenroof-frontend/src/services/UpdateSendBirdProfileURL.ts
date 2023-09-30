import axios from "axios";

export default function updateSendBirdProfile(
    imgUrl: string,
    username: string
) {
    const profileLink = import.meta.env.VITE_SEND_BIRD_USER_PROFILE_LINK;
    const sendBirdURL = profileLink + username;
    const apiToken = import.meta.env.VITE_SEND_BIRD_API_TOKEN;

    return new Promise<void>((resolve) => {
        axios
            .put(
                sendBirdURL,
                {
                    profile_url: imgUrl,
                },
                {
                    headers: {
                        "Api-Token": apiToken,
                    },
                }
            )
            .then((response) => {
                resolve();
            });
    });
}
