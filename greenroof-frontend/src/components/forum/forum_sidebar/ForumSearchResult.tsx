import InfiniteScroll from "react-infinite-scroll-component";
import { useSearch } from "../../../hooks/useContent";
import React from "react";
import ForumFeedQuestion from "../forum_feed/ForumFeedQuestion";
import ForumQuestionerInfo from "../forum_feed/ForumQuestionerInfo";
import PostLoader from "../../PostLoader";
import { useProfile } from "../../../hooks/useProfile";
import ProfileCard from "../../ProfileCard";

interface Props {
    search: string;
}

export default function ForumSearchResult({ search }: Props) {
    const {
        data: questions,
        error,
        isLoading,
        hasNextPage,
        fetchNextPage,
    } = useSearch(search);
    const { data: users } = useProfile(search);

    const fetchedQuestionCount =
        questions?.pages.reduce(
            (total, page) => total + page.contentList.length,
            0
        ) || 0;
    return (
        <>
            <h2 className="font-bold text-[14px] sm:text-[16px] md:text-[22px] dark:text-darksecondary">
                Showing Results for '{search}'
            </h2>
            <div className="flex">
                {users !== undefined &&
                    users?.length > 0 &&
                    users?.map((user) => <ProfileCard user={user} />)}
            </div>
            {isLoading && <PostLoader />}
            {error && <p>Network Error...</p>}
            <InfiniteScroll
                dataLength={fetchedQuestionCount}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader={<PostLoader />}
            >
                <ul className="divide-y divide-graybg dark:divide-opacity-25">
                    {questions?.pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page.contentList.map((question) => (
                                <li
                                    className="grid grid-cols-10 pt-5 pb-5"
                                    key={question.id}
                                >
                                    <ForumQuestionerInfo
                                        id={question.id}
                                        firstName={
                                            question.questioner.firstName
                                        }
                                        lastName={question.questioner.lastName}
                                        username={question.questioner.username}
                                        profilePhoto={
                                            question.questioner.profilePhoto
                                        }
                                        score={question.questioner.score}
                                    />
                                    <ForumFeedQuestion
                                        id={question.id}
                                        questionTitle={question.questionTitle}
                                        questionText={question.questionText}
                                        forumAttatchments={
                                            question.questionAttatchments
                                        }
                                        questionTag={question.questionTag}
                                        createdAt={question.createdAt}
                                    />
                                </li>
                            ))}
                        </React.Fragment>
                    ))}
                </ul>
            </InfiniteScroll>
        </>
    );
}
