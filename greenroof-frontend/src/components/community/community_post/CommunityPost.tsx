import CommunityHeading from "../CommunityHeading";
import CommunityFeedPost from "../community_feed/CommunityFeedPost";
import CommunityComment from "./CommunityComment";
import CommunityCreateComment from "./CommunityCreateComment";

export default function CommunityPost() {
    return (
        <div className="min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
            <CommunityHeading heading="Post" />
            <CommunityFeedPost fullPost={true} />
            <CommunityCreateComment />
            <CommunityComment />
        </div>
    );
}
