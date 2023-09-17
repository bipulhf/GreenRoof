import { useSearchPost } from "../../../hooks/usePost";
import CommunityFeedPost from "../community_feed/CommunityFeedPost";

interface Props {
    search: string;
}

export default function CommunitySearchResult({ search }: Props) {
    const { data: result } = useSearchPost(search);
    return (
        <>
            {result?.map((post) => (
                <CommunityFeedPost
                    key={post.id}
                    postId={post.id}
                    postText={post.postText}
                    user={post.user}
                    createdAt={post.createdAt}
                    fullPost={false}
                />
            ))}
        </>
    );
}
