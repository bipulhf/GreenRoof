import InfiniteScroll from "react-infinite-scroll-component";
import { useLatestPost } from "../../../hooks/usePost";
import CommunityCreatePost from "../CommunityCreatePost";
import CommunityHeading from "../CommunityHeading";
import CommunityFeedPost from "./CommunityFeedPost";
import React from "react";

export default function CommunityFeed() {
    const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
        useLatestPost();
    const fetchedPostCount =
        data?.pages.reduce(
            (total, page) => total + page.contentList.length,
            0
        ) || 0;
    return (
        <div className="min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
            <CommunityHeading heading="Home" />
            <CommunityCreatePost />
            <div className="flex justify-evenly py-3">
                <h2 className="font-bold text-[16px] text-brown">Top Posts</h2>
                <h2 className="font-medium text-[16px] text-gray">Following</h2>
            </div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>{error.message}</p>}
            <InfiniteScroll
                dataLength={fetchedPostCount}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader="<p>Loading</p>"
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
