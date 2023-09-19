import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetComments } from "../../../hooks/useComment";
import CommunityCommentmMarkup from "./CommunityCommentMarkup";
import PostLoader from "../../PostLoader";

interface Props {
    postId: number;
}

export default function CommunityComment({ postId }: Props) {
    const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
        useGetComments(postId);
    const fetchedPostCount =
        data?.pages.reduce(
            (total, page) => total + page.contentList.length,
            0
        ) || 0;
    return (
        <>
            {isLoading && <PostLoader />}
            {isError && <p>{error.message}</p>}
            <InfiniteScroll
                dataLength={fetchedPostCount}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader={<PostLoader />}
                className="divide-y divide-graybg"
            >
                {data?.pages.map((comments, index) => (
                    <React.Fragment key={index}>
                        {comments.contentList.map((comment) => (
                            <CommunityCommentmMarkup
                                key={comment.id}
                                id={comment.id}
                                postId={postId}
                                commenter={comment.commenter}
                                text={comment.commentText}
                                createdAt={comment.createdAt}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </InfiniteScroll>
        </>
    );
}
