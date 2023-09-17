import { useParams } from "react-router-dom";
import { useGetPost } from "../../../hooks/usePost";
import CommunityHeading from "../CommunityHeading";
import CommunityFeedPost from "../community_feed/CommunityFeedPost";
import CommunityComment from "./CommunityComment";
import CommunityCreateComment from "./CommunityCreateComment";

export default function CommunityPost() {
    const { postId } = useParams();
    const {
        data: post,
        isLoading,
        isError,
        error,
    } = useGetPost(parseInt(postId || "0"));
    return (
        post && (
            <>
                {isLoading && <p>Loading...</p>}
                {isError && <p>{error.message}</p>}
                <div className="min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
                    <CommunityHeading heading="Post" />
                    <CommunityFeedPost
                        key={post.id}
                        postId={post.id}
                        postText={post.postText}
                        user={post.user}
                        createdAt={post.createdAt}
                        fullPost={true}
                    />
                    <CommunityCreateComment postId={post.id} />
                    <CommunityComment postId={post.id} />
                </div>
            </>
        )
    );
}
