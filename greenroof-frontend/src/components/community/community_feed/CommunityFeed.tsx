import CommunityCreatePost from "../CommunityCreatePost";
import CommunityHeading from "../CommunityHeading";
import CommunityFeedPost from "./CommunityFeedPost";

export default function CommunityFeed() {
    return (
        <div className="min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
            <CommunityHeading heading="Home" />
            <CommunityCreatePost />
            <div className="flex justify-evenly py-3">
                <h2 className="font-bold text-[16px] text-brown">Top Posts</h2>
                <h2 className="font-medium text-[16px] text-gray">Following</h2>
            </div>
            <CommunityFeedPost fullPost={false} />
        </div>
    );
}
