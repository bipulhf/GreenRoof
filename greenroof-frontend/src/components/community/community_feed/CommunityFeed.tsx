import InfiniteScroll from "react-infinite-scroll-component";
import { useLatestPost } from "../../../hooks/usePost";
import CommunityCreatePost from "../CommunityCreatePost";
import CommunityHeading from "../CommunityHeading";
import CommunityFeedPost from "./CommunityFeedPost";
import React from "react";
import PostLoader from "../../PostLoader";
import { Link } from "react-router-dom";
import { useGetUser } from "../../../hooks/useProfile";
import useAuth from "../../../hooks/useAuth";

export default function CommunityFeed() {
    const { auth } = useAuth();
    const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
        useLatestPost();
    const fetchedPostCount =
        data?.pages.reduce(
            (total, page) => total + page.contentList.length,
            0
        ) || 0;
    const { data: user } = useGetUser(auth.username);
    return (
        <div className="dark:bg-darkbg pb-[10%] min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg dark:divide-opacity-25">
            <CommunityHeading heading="Home" />
            <CommunityCreatePost profilePhoto={user?.profilePhoto || ""} />
            <div className="flex justify-evenly py-3">
                <Link to={"/community"}>
                    <h2 className="dark:text-darktext font-bold text-[16px] text-brown">
                        Most Recent
                    </h2>
                </Link>
                <Link to={"/community/following"}>
                    <h2 className="font-medium text-[16px] text-gray dark:text-darksecondary">
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
                className="divide-y divide-graybg dark:divide-opacity-25"
            >
                {data?.pages.map((posts, index) => (
                    <React.Fragment key={index}>
                        {posts.contentList.length > 0 ? (
                            posts.contentList.map((post) => (
                                <CommunityFeedPost
                                    key={post.id}
                                    postId={post.id}
                                    postText={post.postText}
                                    postAttatchments={post.postAttatchments}
                                    createdAt={post.createdAt}
                                    user={post.user}
                                    fullPost={false}
                                />
                            ))
                        ) : (
                            <>
                                <p className="text-gray font-medium text-center text-xl mt-5">
                                    Nothing to show.
                                </p>
                            </>
                        )}
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
