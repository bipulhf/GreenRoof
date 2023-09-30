import "./Messages.css";
import "@sendbird/uikit-react/dist/index.css";

import React from "react";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import Channel from "@sendbird/uikit-react/Channel";
function Messages() {
  const [currentChannelUrl, setCurrentChannelUrl] = React.useState("");

  const APP_ID = "83DED529-E0E7-4BBB-AEB0-E78D67B2E2D0";
  const USER_ID = "shaifurrahamanshifat71";
  const AccessToken = "34b0f6342f129d96e5f320d1075c32d163aad652";
  return (
    <div className="App">
      <SendbirdProvider
        appId={APP_ID}
        userId={USER_ID}
        nickname="Shaifur Rahaman"
        accessToken={AccessToken}
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
            <Channel channelUrl={currentChannelUrl} />
          </div>
        </>
      </SendbirdProvider>
    </div>
  );
}

export default Messages;
