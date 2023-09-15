import CommunityCreatePost from "../CommunityCreatePost";
import CommunityHeading from "../CommunityHeading";
import CommunityFeedPost from "../community_feed/CommunityFeedPost";
import CommunityUserProfileCard from "./CommunityUserProfileCard";

export default function CommunityUserProfile() {
    return (
        <div className="min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
            <CommunityHeading heading="Profile" />
            <CommunityUserProfileCard />
            <CommunityCreatePost />
            <CommunityFeedPost fullPost={false} />
        </div>
    );
}
