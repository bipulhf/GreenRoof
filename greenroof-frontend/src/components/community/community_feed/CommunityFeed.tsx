import CommunityCreatePost from "../CommunityCreatePost";
import CommunityHeading from "../CommunityHeading";
import CommunityFeedPostSummary from "./CommunityFeedPostSummary.2";

export default function CommunityFeed() {
    return (
        <div className="min-h-screen w-[53%] ml-[22%] divide-y divide-graybg">
            <CommunityHeading />
            <CommunityCreatePost />
            <div className="flex justify-evenly py-3">
                <h2 className="font-bold text-[16px] text-brown">Top Posts</h2>
                <h2 className="font-medium text-[16px] text-gray">Following</h2>
            </div>
            <CommunityFeedPostSummary />
        </div>
    );
}
