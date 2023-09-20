import InfiniteScroll from "react-infinite-scroll-component";
import CommunityCreatePost from "../CommunityCreatePost";
import CommunityHeading from "../CommunityHeading";
import CommunityFeedPost from "./CommunityFeedPost";
import React from "react";
import PostLoader from "../../PostLoader";
import { Link } from "react-router-dom";
import { useFollowingPost } from "../../../hooks/usePost";

export default function CommunityFollowingFeed() {
    const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
        useFollowingPost();
    const fetchedPostCount =
        data?.pages.reduce(
            (total, page) => total + page.contentList.length,
            0
        ) || 0;
    return (
        <div className="pb-[10%] min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
            <CommunityHeading heading="Home" />
            <CommunityCreatePost />
            <div className="flex justify-evenly py-3">
                <Link to={"/community"}>
                    <h2 className="font-medium text-[16px] text-gray">
                        Most Recent
                    </h2>
                </Link>
                <Link to={"/community/following"}>
                    <h2 className="font-bold text-[16px] text-brown">
                        Following
                    </h2>
                </Link>
            </div>
            {isError && <p>{error.message}</p>}
            <InfiniteScroll
                dataLength={fetchedPostCount}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader={<PostLoader />}
                className="divide-y divide-graybg"
            >
                {data?.pages.map((posts, index) => (
                    <React.Fragment key={index}>
                        {posts.contentList.map((post) => (
                            <CommunityFeedPost
                                key={post.id}
                                postId={post.id}
                                postText={post.postText}
                                postAttatchments={post.postAttatchments}
                                createdAt={post.createdAt}
                                user={post.user}
                                fullPost={false}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </InfiniteScroll>
            {isLoading && (
                <>
                    <PostLoader />
                    <PostLoader />
                    <PostLoader />
                </>
            )}
        </div>
    );
}
