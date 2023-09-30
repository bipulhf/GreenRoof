import { useParams } from "react-router-dom";
import ForumFeedQuestion from "../forum_feed/ForumFeedQuestion";
import ForumQuestionerInfo from "../forum_feed/ForumQuestionerInfo";
import ForumAnswer from "./ForumAnswer";
import ForumAnswererInfo from "./ForumAnswererInfo";
import ForumAddAnswer from "./ForumAddAnswer";
import { useGetQuestion } from "../../../hooks/useQuestion";
import { useGetAnswers } from "../../../hooks/useAnswer";
import QuestionLoader from "../QuestionLoader";

export default function ForumPost() {
    const { postId } = useParams();
    const {
        data: questions,
        error,
        isLoading,
    } = useGetQuestion(parseInt(postId || "0"));

    const { data: answers, isLoading: answerLoading } = useGetAnswers(
        parseInt(postId || "0")
    );

    return (
        <>
            {error && <p className="text-red">Network Error...</p>}
            <div className="divide-y divide-graybg dark:divide-opacity-25">
                <div className="font-semibold text-gray text-[11px] sm:text-[13px] md:text-[16px]">
                    Question
                </div>
                {isLoading && <QuestionLoader />}
                <div className="grid grid-cols-10 pt-5 pb-5">
                    <ForumQuestionerInfo
                        firstName={questions?.questioner.firstName || ""}
                        lastName={questions?.questioner.lastName || ""}
                        profilePhoto={questions?.questioner.profilePhoto || ""}
                        username={questions?.questioner.username || ""}
                        id={questions?.id || 0}
                        score={questions?.questioner.score || 0}
                    />
                    <ForumFeedQuestion
                        id={questions?.id || 0}
                        questionTitle={questions?.questionTitle || ""}
                        questionText={questions?.questionText || ""}
                        forumAttatchments={
                            questions?.questionAttatchments || []
                        }
                        questionTag={questions?.questionTag || []}
                        createdAt={questions?.createdAt || new Date()}
                    />
                </div>
                <div className="mt-[10px]">
                    <ForumAddAnswer id={questions?.id || 0} />
                </div>
                <div className="mt-[10px]">
                    {answers?.length > 0 && (
                        <span className="text-gray font-semibold text-[11px] sm:text-[13px] md:text-[16px]">
                            Answers
                        </span>
                    )}
                    {answerLoading && <QuestionLoader />}
                    <ul className="divide-y divide-graybg dark:divide-opacity-25">
                        {answers?.map((answer) => (
                            <li
                                key={answer.id}
                                className=" grid grid-cols-10 py-4"
                            >
                                <ForumAnswererInfo
                                    answerId={answer.id}
                                    postId={questions?.id || 0}
                                    firstName={answer.answerer.firstName}
                                    lastName={answer.answerer.lastName}
                                    username={answer.answerer.username}
                                    profilePhoto={answer.answerer.profilePhoto}
                                    score={answer.answerer.score}
                                />
                                <ForumAnswer
                                    id={answer?.id || 0}
                                    answerText={answer?.answerText || ""}
                                    createdAt={answer?.createdAt || new Date()}
                                    score={answer?.score || 0}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
