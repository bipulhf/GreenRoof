import { useSearchPost } from "../../../hooks/usePost";
import { useProfile } from "../../../hooks/useProfile";
import ProfileCard from "../../ProfileCard";
import CommunityFeedPost from "../community_feed/CommunityFeedPost";

interface Props {
    search: string;
}

export default function CommunitySearchResult({ search }: Props) {
    const { data: result } = useSearchPost(search);
    const { data: users } = useProfile(search);
    return (
        <>
            <div className="flex">
                {users !== undefined &&
                    users?.length > 0 &&
                    users?.map((user) => <ProfileCard user={user} />)}
            </div>
            {result?.map((post) => (
                <CommunityFeedPost
                    key={post.id}
                    postId={post.id}
                    postText={post.postText}
                    postAttatchments={post.postAttatchments}
                    user={post.user}
                    createdAt={post.createdAt}
                    fullPost={false}
                />
            ))}
        </>
    );
}
