import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityCreatePost from "../CommunityCreatePost";
import CommunityHeading from "../CommunityHeading";
import CommunityFeedPost from "../community_feed/CommunityFeedPost";
import CommunityUserProfileCard from "./CommunityUserProfileCard";
import { useGetUserPost } from "../../../hooks/usePost";
import { useParams } from "react-router-dom";
import {
    useTotalFollowers,
    useTotalFollowings,
} from "../../../hooks/useFollowersFollowings";

export default function CommunityUserProfile() {
    const { username } = useParams();
    const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
        useGetUserPost(username || "");
    const fetchedPostCount =
        data?.pages.reduce(
            (total, page) => total + page.contentList.length,
            0
        ) || 0;
    const user = data?.pages[0].contentList[0].user;
    const { data: totalFollowers } = useTotalFollowers(username || "");
    const { data: totalFollowings } = useTotalFollowings(username || "");
    return (
        <div className="min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
            <CommunityHeading heading="Profile" />
            <CommunityUserProfileCard
                firstname={user?.firstName || ""}
                lastname={user?.lastName || ""}
                username={user?.username || ""}
                city={user?.city || ""}
                followers={totalFollowers?.total || 0}
                followings={totalFollowings?.total || 0}
            />
            <CommunityCreatePost />
            {isLoading && <p>Loading...</p>}
            {isError && <p>{error.message}</p>}
            <InfiniteScroll
                dataLength={fetchedPostCount}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader="<p>Loading...</p>"
            >
                {data?.pages.map((posts, index) => (
                    <React.Fragment key={index}>
                        {posts.contentList.map((post) => (
                            <CommunityFeedPost
                                key={post.id}
                                postId={post.id}
                                postText={post.postText}
                                createdAt={post.createdAt}
                                user={post.user}
                                fullPost={false}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </InfiniteScroll>
        </div>
    );
}
