import useContent from "../../../hooks/useContent";
import AskQuestion from "../AskQuestion";
import ForumFeedQuestion from "./ForumFeedQuestion";
import ForumQuestionerInfo from "./ForumQuestionerInfo";

export default function ForumFeed() {
    const { data: questions, error, isLoading } = useContent();

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Network Error...</p>}

            <div className="flex justify-between mb-5">
                <h2 className="font-bold text-[14px] sm:text-[16px] md:text-[22px]">
                    Recent Questions
                </h2>
                <AskQuestion />
            </div>
            <ul className="divide-y divide-graybg">
                {questions?.contentList.map((question) => (
                    <li
                        className="grid grid-cols-10 pt-5 pb-5"
                        key={question.id}
                    >
                        <ForumQuestionerInfo
                            firstName={question.questioner.firstName}
                            lastName={question.questioner.lastName}
                            username={question.questioner.username}
                        />
                        <ForumFeedQuestion
                            id={question.id}
                            questionTitle={question.questionTitle}
                            questionText={question.questionText}
                            createdAt={question.createdAt}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}
