import "./Messages.css";
import React from "react";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import Channel from "@sendbird/uikit-react/Channel";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
function MessageUser() {
    const { channelName } = useParams<string>();
    const [currentChannelUrl, setCurrentChannelUrl] =
        React.useState(channelName);
    const { auth } = useAuth();

    const APP_ID = import.meta.env.VITE_SEND_BIRD_APP_ID;
    const USER_ID = auth.username;
    return (
        <div className="App">
            <SendbirdProvider
                appId={APP_ID}
                userId={USER_ID}
                uikitOptions={{
                    groupChannel: {
                        enableTypingIndicator: true,
                        enableReactions: true,
                    },
                    groupChannelSettings: {
                        // Setting this to false will hide the 🔎 icon on the top right corner.
                        enableMessageSearch: false,
                    },
                }}
            >
                <>
                    <div className="sendbird-app__channellist-wrap">
                        <ChannelList
                            onChannelSelect={(channel) => {
                                if (channel?.url) {
                                    setCurrentChannelUrl(channel.url);
                                }
                            }}
                        />
                    </div>
                    <div className="sendbird-app__conversation-wrap">
                        <Channel channelUrl={currentChannelUrl || ""} />
                    </div>
                </>
            </SendbirdProvider>
        </div>
    );
}

export default MessageUser;
