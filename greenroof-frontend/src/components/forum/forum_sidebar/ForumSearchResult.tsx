import InfiniteScroll from "react-infinite-scroll-component";
import { useSearch } from "../../../hooks/useContent";
import React from "react";
import ForumFeedQuestion from "../forum_feed/ForumFeedQuestion";
import ForumQuestionerInfo from "../forum_feed/ForumQuestionerInfo";
import PostLoader from "../../PostLoader";

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

    const fetchedQuestionCount =
        questions?.pages.reduce(
            (total, page) => total + page.contentList.length,
            0
        ) || 0;
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Network Error...</p>}
            {console.log(questions)}
            <h2 className="font-bold text-[14px] sm:text-[16px] md:text-[22px] dark:text-darksecondary">
                Showing Results for '{search}'
            </h2>
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
                                    />
                                    <ForumFeedQuestion
                                        id={question.id}
                                        questionTitle={question.questionTitle}
                                        questionText={question.questionText}
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
