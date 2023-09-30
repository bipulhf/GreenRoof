import "./Messages.css";
import "@sendbird/uikit-react/dist/index.css";

import React from "react";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import Channel from "@sendbird/uikit-react/Channel";
import useAuth from "../../hooks/useAuth";
function Messages() {
    const [currentChannelUrl, setCurrentChannelUrl] = React.useState("");
    const { auth } = useAuth();

    const APP_ID = "83DED529-E0E7-4BBB-AEB0-E78D67B2E2D0";
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
                        <Channel channelUrl={currentChannelUrl} />
                    </div>
                </>
            </SendbirdProvider>
        </div>
    );
}

export default Messages;
