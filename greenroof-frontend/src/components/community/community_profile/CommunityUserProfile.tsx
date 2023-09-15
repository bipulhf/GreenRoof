import CommunityCreatePost from "../CommunityCreatePost";
import CommunityHeading from "../CommunityHeading";
import CommunityFeedPost from "../community_feed/CommunityFeedPost";
import CommunityUserProfileCard from "./CommunityUserProfileCard";

export default function CommunityUserProfile() {
    return (
        <div className="min-h-screen w-[53%] ml-[22%] divide-y divide-graybg">
            <CommunityHeading heading="Profile" />
            <CommunityUserProfileCard />
            <CommunityCreatePost />
            <CommunityFeedPost />
        </div>
    );
}
