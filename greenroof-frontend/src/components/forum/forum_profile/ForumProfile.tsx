import AskQuestion from "../AskQuestion";
import ForumFeedQuestion from "../forum_feed/ForumFeedQuestion";
import ForumUserInfo from "./ForumUserInfo";

export default function ForumProfile() {
    return (
        <>
            <div className="grid justify-end">
                <AskQuestion />
            </div>
            <ForumUserInfo />
            <div className="divide-y divide-graybg">
                <div className="pt-5 pb-5">
                    <ForumFeedQuestion />
                </div>
                <div className="pt-5 pb-5">
                    <ForumFeedQuestion />
                </div>
            </div>
        </>
    );
}
