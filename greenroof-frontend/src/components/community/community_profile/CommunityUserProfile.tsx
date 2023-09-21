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
import useAuth from "../../../hooks/useAuth";
import PostLoader from "../../PostLoader";
import { useProfile } from "../../../hooks/useProfile";
import ProfileLoader from "../../ProfileLoader";

export default function CommunityUserProfile() {
    const { auth } = useAuth();
    const { username } = useParams();
    const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
        useGetUserPost(username || "");
    const fetchedPostCount =
        data?.pages.reduce(
            (total, page) => total + page.contentList.length,
            0
        ) || 0;
    const {
        data: users,
        isLoading: userLoading,
        isError: userErrors,
        error: userError,
    } = useProfile(username || "");
    const user = users != null ? users[0] : null;
    const { data: totalFollowers } = useTotalFollowers(username || "");
    const { data: totalFollowings } = useTotalFollowings(username || "");
    return (
        <div className="pb-[10%] min-h-screen md:w-[68%] min-[1000px]:w-[53%] md:ml-[30%] min-[1000px]:ml-[22%] divide-y divide-graybg">
            <CommunityHeading heading="Profile" />
            {userErrors && <p>{userError.message}</p>}
            {userLoading ? (
                <ProfileLoader />
            ) : (
                <CommunityUserProfileCard
                    firstname={user?.firstName || ""}
                    lastname={user?.lastName || ""}
                    username={user?.username || ""}
                    city={user?.city || ""}
                    followers={totalFollowers?.total || 0}
                    followings={totalFollowings?.total || 0}
                />
            )}
            {auth.username === user?.username && <CommunityCreatePost />}
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
