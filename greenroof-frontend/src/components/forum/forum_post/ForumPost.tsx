import { useParams } from "react-router-dom";
import ForumFeedQuestion from "../forum_feed/ForumFeedQuestion";
import ForumQuestionerInfo from "../forum_feed/ForumQuestionerInfo";
import ForumAnswer from "./ForumAnswer";
import ForumAnswererInfo from "./ForumAnswererInfo";
import ForumAddAnswer from "./ForumAddAnswer";
import { useGetQuestion } from "../../../hooks/useQuestion";
import { useGetAnswers } from "../../../hooks/useAnswer";

export default function ForumPost() {
    const { postId } = useParams();
    const {
        data: questions,
        error,
        isLoading,
    } = useGetQuestion(parseInt(postId || "0"));

    const { data: answers } = useGetAnswers(parseInt(postId || "0"));

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Network Error...</p>}
            <div className="divide-y divide-graybg">
                <div className="font-semibold text-gray text-[11px] sm:text-[13px] md:text-[16px]">
                    Question
                </div>
                <div className="grid grid-cols-10 pt-5 pb-5">
                    <ForumQuestionerInfo
                        firstName={questions?.questioner.firstName || ""}
                        lastName={questions?.questioner.lastName || ""}
                        username={questions?.questioner.username || ""}
                        id={questions?.id || 0}
                    />
                    <ForumFeedQuestion
                        id={questions?.id || 0}
                        questionTitle={questions?.questionTitle || ""}
                        questionText={questions?.questionText || ""}
                        createdAt={questions?.createdAt || new Date()}
                    />
                </div>
                <div className="mt-[10px]">
                    <p className="font-semibold text-gray text-[13px]">
                        Answer this question
                    </p>
                    <ForumAddAnswer id={questions?.id || 0} />
                </div>
                <div className="mt-[10px]">
                    <span className="text-gray font-semibold text-[11px] sm:text-[13px] md:text-[16px]">
                        Answers
                    </span>
                    <ul className="divide-y divide-graybg">
                        {answers?.map((answer) => (
                            <li
                                key={answer.id}
                                className=" grid grid-cols-10 py-4"
                            >
                                <ForumAnswererInfo
                                    answerId={answer?.id || 0}
                                    postId={questions?.id || 0}
                                    firstName={answer?.answerer.firstName || ""}
                                    lastName={answer?.answerer.lastName || ""}
                                    username={answer?.answerer.username || ""}
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
