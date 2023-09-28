import React from "react";
import AskQuestion from "../AskQuestion";
import ForumFeedQuestion from "./ForumFeedQuestion";
import ForumQuestionerInfo from "./ForumQuestionerInfo";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContent } from "../../../hooks/useContent";
import QuestionLoader from "../QuestionLoader";

export default function ForumFeed() {
    const {
        data: questions,
        error,
        isLoading,
        hasNextPage,
        fetchNextPage,
    } = useContent();

    const fetchedQuestionCount =
        questions?.pages.reduce(
            (total, page) => total + page.contentList.length,
            0
        ) || 0;

    return (
        <>
            {error && <p className="text-red">Network Error...</p>}

            <div className="flex justify-between mb-5">
                <h2 className="font-bold text-[14px] sm:text-[16px] md:text-[22px] dark:text-white">
                    Recent Questions
                </h2>
                <AskQuestion />
            </div>
            <InfiniteScroll
                dataLength={fetchedQuestionCount}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader={<QuestionLoader />}
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
                                        profilePhoto={
                                            question.questioner.profilePhoto
                                        }
                                        lastName={question.questioner.lastName}
                                        username={question.questioner.username}
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
            {isLoading && (
                <>
                    <QuestionLoader />
                    <QuestionLoader />
                    <QuestionLoader />
                </>
            )}
        </>
    );
}
